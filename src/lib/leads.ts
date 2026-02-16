import { AttributionContext } from "@/lib/attribution";

export type ContactLeadPayload = {
  type: "contact";
  name: string;
  businessName: string;
  email: string;
  message: string;
  pageUrl: string;
  referrer: string | null;
  attribution: AttributionContext;
  turnstileToken: string;
  honeypot: string;
};

export type SystemRequestLeadPayload = {
  type: "system_request";
  fullName: string;
  businessName: string;
  businessEmail: string;
  phone: string;
  industry: string;
  mode: string;
  devicesCount: number;
  branchesCount: number;
  modules: string[];
  timeline: string;
  budgetRange: string;
  pageUrl: string;
  referrer: string | null;
  attribution: AttributionContext;
  turnstileToken: string;
  honeypot: string;
};

export type WaitlistLeadPayload = {
  type: "waitlist";
  email: string;
  productInterest: string;
  fullName: string;
  phone: string;
  businessName: string;
  notes: string;
  pageUrl: string;
  referrer: string | null;
  attribution: AttributionContext;
  turnstileToken: string;
  honeypot: string;
};

export type LeadSubmissionPayload =
  | ContactLeadPayload
  | SystemRequestLeadPayload
  | WaitlistLeadPayload;

export type LeadSubmissionResult = {
  ok: boolean;
  error?: string;
  delivered?: boolean;
};

const REQUEST_TIMEOUT_MS = 12000;

export const submitLead = async (
  payload: LeadSubmissionPayload,
): Promise<LeadSubmissionResult> => {
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      return {
        ok: false,
        error: typeof data.error === "string" ? data.error : "Lead submission failed.",
      };
    }

    return {
      ok: true,
      delivered: Boolean(data.delivered),
    };
  } catch {
    return {
      ok: false,
      error: "Network error while submitting lead.",
    };
  } finally {
    window.clearTimeout(timeoutId);
  }
};
