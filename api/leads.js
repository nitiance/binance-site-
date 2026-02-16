const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 8;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const rateBucket = globalThis.__binancexiLeadRateBucket || new Map();
globalThis.__binancexiLeadRateBucket = rateBucket;

const json = (res, statusCode, payload) => {
  res.statusCode = statusCode;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  res.end(JSON.stringify(payload));
};

const cleanText = (value, maxLength = 3000) => {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim().slice(0, maxLength);
};

const cleanArray = (value, maxItems = 20, itemMaxLength = 100) => {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item) => cleanText(item, itemMaxLength))
    .filter(Boolean)
    .slice(0, maxItems);
};

const parseInteger = (value) => {
  const numeric = Number.parseInt(String(value), 10);
  return Number.isFinite(numeric) ? numeric : NaN;
};

const getClientIp = (req) => {
  const forwarded = req.headers["x-forwarded-for"];
  if (typeof forwarded === "string" && forwarded.length > 0) {
    return forwarded.split(",")[0].trim();
  }

  if (Array.isArray(forwarded) && forwarded[0]) {
    return forwarded[0].trim();
  }

  return req.socket?.remoteAddress || "unknown";
};

const stripPort = (host) => {
  if (!host) return "";
  return host.split(":")[0].trim().toLowerCase();
};

const parseAllowedHosts = () => {
  const raw = process.env.ALLOWED_ORIGINS;
  if (!raw) return [];

  return raw
    .split(",")
    .map((entry) => entry.trim())
    .filter(Boolean)
    .map((entry) => {
      if (entry.startsWith("http://") || entry.startsWith("https://")) {
        try {
          return stripPort(new URL(entry).host);
        } catch {
          return stripPort(entry);
        }
      }
      return stripPort(entry);
    })
    .filter(Boolean);
};

const hostMatches = (host, pattern) => {
  if (!host || !pattern) return false;
  if (pattern.startsWith("*.")) {
    const suffix = pattern.slice(1); // ".vercel.app"
    return host.endsWith(suffix);
  }
  return host === pattern;
};

const isAllowedRequestOrigin = (req) => {
  const allowedHosts = parseAllowedHosts();
  if (allowedHosts.length === 0) {
    return true;
  }

  const origin = typeof req.headers.origin === "string" ? req.headers.origin : "";
  let originHost = "";
  if (origin) {
    try {
      originHost = stripPort(new URL(origin).host);
    } catch {
      originHost = "";
    }
  }

  const hostHeader = typeof req.headers.host === "string" ? stripPort(req.headers.host) : "";

  for (const allowed of allowedHosts) {
    if (hostMatches(originHost, allowed) || hostMatches(hostHeader, allowed)) {
      return true;
    }
  }

  return false;
};

const isRateLimitedInMemory = (ip) => {
  const now = Date.now();
  const bucket = rateBucket.get(ip);

  if (!bucket || now - bucket.windowStart > RATE_LIMIT_WINDOW_MS) {
    rateBucket.set(ip, {
      windowStart: now,
      count: 1,
    });
    return false;
  }

  bucket.count += 1;
  rateBucket.set(ip, bucket);

  return bucket.count > RATE_LIMIT_MAX_REQUESTS;
};

const isRateLimited = async (ip) => {
  const upstashUrl = process.env.UPSTASH_REDIS_REST_URL;
  const upstashToken = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!upstashUrl || !upstashToken) {
    return isRateLimitedInMemory(ip);
  }

  const key = `lead:${ip}`;
  const windowSeconds = Math.ceil(RATE_LIMIT_WINDOW_MS / 1000);

  try {
    const incrResponse = await fetch(
      `${upstashUrl.replace(/\/+$/, "")}/incr/${encodeURIComponent(key)}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${upstashToken}`,
        },
      },
    );

    if (!incrResponse.ok) {
      return isRateLimitedInMemory(ip);
    }

    const incrData = await incrResponse.json();
    const count = typeof incrData.result === "number" ? incrData.result : NaN;

    if (!Number.isFinite(count)) {
      return isRateLimitedInMemory(ip);
    }

    if (count === 1) {
      // Best-effort expiry setup (non-fatal if it fails).
      fetch(
        `${upstashUrl.replace(/\/+$/, "")}/expire/${encodeURIComponent(key)}/${windowSeconds}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${upstashToken}`,
          },
        },
      ).catch(() => {});
    }

    return count > RATE_LIMIT_MAX_REQUESTS;
  } catch {
    return isRateLimitedInMemory(ip);
  }
};

const readJsonBody = async (req) =>
  new Promise((resolve, reject) => {
    let raw = "";

    req.on("data", (chunk) => {
      raw += chunk;
      if (raw.length > 200_000) {
        reject(new Error("Payload too large."));
      }
    });

    req.on("end", () => {
      if (!raw) {
        resolve({});
        return;
      }

      try {
        resolve(JSON.parse(raw));
      } catch {
        reject(new Error("Invalid JSON payload."));
      }
    });

    req.on("error", () => reject(new Error("Failed to read request body.")));
  });

const validateLead = (payload) => {
  const type = cleanText(payload.type, 40);
  if (type !== "contact" && type !== "system_request" && type !== "waitlist") {
    return { error: "Invalid lead type." };
  }

  if (type === "contact") {
    const name = cleanText(payload.name, 120);
    const businessName = cleanText(payload.businessName, 160);
    const email = cleanText(payload.email, 160).toLowerCase();
    const message = cleanText(payload.message, 2500);

    if (!name || !businessName || !email || !message) {
      return { error: "Missing required contact fields." };
    }

    if (!EMAIL_REGEX.test(email)) {
      return { error: "Invalid contact email format." };
    }

    return {
      value: {
        type,
        name,
        businessName,
        email,
        message,
      },
    };
  }

  if (type === "waitlist") {
    const email = cleanText(payload.email, 160).toLowerCase();
    const productInterest = cleanText(payload.productInterest, 160);
    const fullName = cleanText(payload.fullName, 120);
    const phone = cleanText(payload.phone, 60);
    const businessName = cleanText(payload.businessName, 160);
    const notes = cleanText(payload.notes, 2500);

    if (!email || !productInterest) {
      return { error: "Missing required early access fields." };
    }

    if (!EMAIL_REGEX.test(email)) {
      return { error: "Invalid early access email format." };
    }

    return {
      value: {
        type,
        email,
        productInterest,
        fullName,
        phone,
        businessName,
        notes,
      },
    };
  }

  const fullName = cleanText(payload.fullName, 120);
  const businessName = cleanText(payload.businessName, 160);
  const businessEmail = cleanText(payload.businessEmail, 160).toLowerCase();
  const phone = cleanText(payload.phone, 60);
  const industry = cleanText(payload.industry, 120);
  const mode = cleanText(payload.mode, 120);
  const timeline = cleanText(payload.timeline, 120);
  const budgetRange = cleanText(payload.budgetRange, 200);
  const modules = cleanArray(payload.modules);
  const devicesCount = parseInteger(payload.devicesCount);
  const branchesCount = parseInteger(payload.branchesCount);

  if (
    !fullName ||
    !businessName ||
    !businessEmail ||
    !phone ||
    !industry ||
    !mode ||
    !timeline ||
    modules.length === 0
  ) {
    return { error: "Missing required system request fields." };
  }

  if (!EMAIL_REGEX.test(businessEmail)) {
    return { error: "Invalid business email format." };
  }

  if (!Number.isFinite(devicesCount) || devicesCount < 1) {
    return { error: "Devices/computers count must be a number >= 1." };
  }

  if (!Number.isFinite(branchesCount) || branchesCount < 1) {
    return { error: "Branches count must be a number >= 1." };
  }

  return {
    value: {
      type,
      fullName,
      businessName,
      businessEmail,
      phone,
      industry,
      mode,
      timeline,
      budgetRange,
      modules,
      devicesCount,
      branchesCount,
    },
  };
};

const verifyTurnstile = async (token, ip) => {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    return { ok: true, skipped: true };
  }

  if (!token) {
    return { ok: false, reason: "Missing turnstile token." };
  }

  const body = new URLSearchParams({
    secret,
    response: token,
    remoteip: ip,
  });

  const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
  });

  if (!response.ok) {
    return { ok: false, reason: `Turnstile verification HTTP ${response.status}.` };
  }

  const data = await response.json();
  if (!data.success) {
    const errorCodes = Array.isArray(data["error-codes"]) ? data["error-codes"].join(", ") : "";
    return {
      ok: false,
      reason: errorCodes || "Turnstile verification failed.",
    };
  }

  return { ok: true, skipped: false };
};

const buildEmailText = ({ lead, context, ip }) => {
  const lines = [
    `Lead Type: ${lead.type}`,
    `Received At: ${new Date().toISOString()}`,
    `IP: ${ip}`,
    "",
  ];

  if (lead.type === "contact") {
    lines.push(
      "Contact",
      `Name: ${lead.name}`,
      `Business Name: ${lead.businessName}`,
      `Email: ${lead.email}`,
      "",
      "Message:",
      lead.message,
    );
  } else if (lead.type === "waitlist") {
    lines.push(
      "Early Access",
      `Email: ${lead.email}`,
      `Product Interest: ${lead.productInterest}`,
      `Full Name: ${lead.fullName || "-"}`,
      `Phone: ${lead.phone || "-"}`,
      `Business Name: ${lead.businessName || "-"}`,
      "",
      "Notes:",
      lead.notes || "-",
    );
  } else {
    lines.push(
      "System Request",
      `Full Name: ${lead.fullName}`,
      `Business Name: ${lead.businessName}`,
      `Business Email: ${lead.businessEmail}`,
      `Phone: ${lead.phone}`,
      `Industry: ${lead.industry}`,
      `Mode: ${lead.mode}`,
      `Devices/Computers Count: ${lead.devicesCount}`,
      `Branches Count: ${lead.branchesCount}`,
      `Modules: ${lead.modules.join(", ")}`,
      `Timeline: ${lead.timeline}`,
      `Budget Range: ${lead.budgetRange || "Not provided"}`,
    );
  }

  lines.push(
    "",
    "Context",
    `Page URL: ${context.pageUrl || "unknown"}`,
    `Referrer: ${context.referrer || "none"}`,
    `User Agent: ${context.userAgent || "unknown"}`,
    "",
    "Attribution",
    JSON.stringify(context.attribution || {}, null, 2),
  );

  return lines.join("\n");
};

const deliverByEmail = async ({ lead, context, ip }) => {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  const to = process.env.LEAD_RECEIVER_EMAIL || "nitiance@gmail.com";

  if (!apiKey || !from) {
    return { ok: false, skipped: true, reason: "Missing Resend configuration." };
  }

  const subject =
    lead.type === "contact"
      ? `New Contact Lead - ${lead.businessName}`
      : lead.type === "waitlist"
        ? `New Early Access Signup - ${lead.productInterest}`
        : `New System Request - ${lead.businessName}`;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject,
      text: buildEmailText({ lead, context, ip }),
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    return {
      ok: false,
      skipped: false,
      reason: `Resend error (${response.status}): ${errorText.slice(0, 300)}`,
    };
  }

  return { ok: true, skipped: false };
};

const storeInSupabase = async ({ lead, context, ip }) => {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseServiceRole = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const table = process.env.SUPABASE_LEADS_TABLE || "lead_requests";

  if (!supabaseUrl || !supabaseServiceRole) {
    return { ok: false, skipped: true, reason: "Missing Supabase configuration." };
  }

  const endpoint = `${supabaseUrl.replace(/\/+$/, "")}/rest/v1/${table}`;
  const payload = {
    lead_type: lead.type,
    full_name:
      lead.type === "contact"
        ? lead.name
        : lead.type === "waitlist"
          ? lead.fullName || null
          : lead.fullName,
    business_name:
      lead.type === "waitlist" ? lead.businessName || "Early Access" : lead.businessName,
    business_email:
      lead.type === "contact"
        ? lead.email
        : lead.type === "waitlist"
          ? lead.email
          : lead.businessEmail,
    phone: lead.type === "system_request" ? lead.phone : lead.type === "waitlist" ? lead.phone || null : null,
    message: lead.type === "contact" ? lead.message : lead.type === "waitlist" ? lead.notes || null : null,
    industry: lead.type === "system_request" ? lead.industry : lead.type === "waitlist" ? lead.productInterest : null,
    mode: lead.type === "system_request" ? lead.mode : null,
    devices_count: lead.type === "system_request" ? lead.devicesCount : null,
    branches_count: lead.type === "system_request" ? lead.branchesCount : null,
    modules: lead.type === "system_request" ? lead.modules : null,
    timeline: lead.type === "system_request" ? lead.timeline : null,
    budget_range: lead.type === "system_request" ? lead.budgetRange || null : null,
    extra:
      lead.type === "waitlist"
        ? {
            product_interest: lead.productInterest,
          }
        : null,
    page_url: context.pageUrl,
    referrer: context.referrer,
    attribution: context.attribution || null,
    ip_address: ip,
    user_agent: context.userAgent,
  };

  const attemptInsert = async (data) =>
    fetch(endpoint, {
      method: "POST",
      headers: {
        apikey: supabaseServiceRole,
        Authorization: `Bearer ${supabaseServiceRole}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify(data),
    });

  let response = await attemptInsert(payload);
  if (!response.ok) {
    const errorText = await response.text();

    // Backwards-compatible retry if the "extra" column doesn't exist.
    if (errorText.includes("column") && errorText.includes("extra")) {
      const retryPayload = { ...payload };
      delete retryPayload.extra;
      response = await attemptInsert(retryPayload);

      if (response.ok) {
        return { ok: true, skipped: false };
      }
    }

    return {
      ok: false,
      skipped: false,
      reason: `Supabase error (${response.status}): ${errorText.slice(0, 300)}`,
    };
  }

  return { ok: true, skipped: false };
};

export default async function handler(req, res) {
  if (req.method === "OPTIONS") {
    res.statusCode = 204;
    res.end();
    return;
  }

  if (req.method !== "POST") {
    json(res, 405, { ok: false, error: "Method not allowed." });
    return;
  }

  if (!isAllowedRequestOrigin(req)) {
    json(res, 403, { ok: false, error: "Forbidden origin." });
    return;
  }

  const ip = getClientIp(req);
  if (await isRateLimited(ip)) {
    json(res, 429, { ok: false, error: "Too many requests. Try again later." });
    return;
  }

  let payload;
  try {
    payload = await readJsonBody(req);
  } catch (error) {
    json(res, 400, { ok: false, error: error.message });
    return;
  }

  const honeypot = cleanText(payload.honeypot, 200);
  if (honeypot) {
    json(res, 200, { ok: true, delivered: false, ignored: true });
    return;
  }

  const validation = validateLead(payload);
  if (validation.error) {
    json(res, 400, { ok: false, error: validation.error });
    return;
  }

  let turnstileResult;
  try {
    turnstileResult = await verifyTurnstile(cleanText(payload.turnstileToken, 5000), ip);
  } catch {
    json(res, 502, { ok: false, error: "Turnstile verification unavailable." });
    return;
  }

  if (!turnstileResult.ok) {
    json(res, 400, { ok: false, error: turnstileResult.reason });
    return;
  }

  const lead = validation.value;
  const context = {
    pageUrl: cleanText(payload.pageUrl, 400),
    referrer: cleanText(payload.referrer, 400) || null,
    userAgent: cleanText(req.headers["user-agent"], 400),
    attribution:
      typeof payload.attribution === "object" && payload.attribution !== null
        ? payload.attribution
        : null,
  };

  const [emailResult, supabaseResult] = await Promise.all([
    deliverByEmail({ lead, context, ip }),
    storeInSupabase({ lead, context, ip }),
  ]);

  const delivered = emailResult.ok || supabaseResult.ok;
  if (!delivered) {
    json(res, 503, {
      ok: false,
      error: "No lead delivery channel succeeded.",
      email: emailResult.reason || null,
      storage: supabaseResult.reason || null,
    });
    return;
  }

  json(res, 200, {
    ok: true,
    delivered: true,
    emailDelivered: emailResult.ok,
    stored: supabaseResult.ok,
  });
}
