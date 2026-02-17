import { FormEvent, useEffect, useMemo, useState } from "react";
import { Mail } from "lucide-react";
import TurnstileWidget from "@/components/TurnstileWidget";
import { getAttributionContext } from "@/lib/attribution";
import { submitLead } from "@/lib/leads";
import { trackEvent } from "@/lib/analytics";

const productOptions = [
  "Business System Suite",
  "Inventory + Alerts",
  "Analytics Studio",
  "Offline Sync Engine",
  "Other",
] as const;

type EarlyAccessState = {
  email: string;
  productInterest: string;
  fullName: string;
  phone: string;
  businessName: string;
  notes: string;
};

const createInitialState = (defaultProductInterest?: string): EarlyAccessState => {
  const normalized =
    defaultProductInterest && productOptions.includes(defaultProductInterest as (typeof productOptions)[number])
      ? defaultProductInterest
      : "";

  return {
    email: "",
    productInterest: normalized,
    fullName: "",
    phone: "",
    businessName: "",
    notes: "",
  };
};

type EarlyAccessFormProps = {
  defaultProductInterest?: string;
};

const EarlyAccessForm = ({ defaultProductInterest }: EarlyAccessFormProps) => {
  const [formState, setFormState] = useState<EarlyAccessState>(() => createInitialState(defaultProductInterest));
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [honeypot, setHoneypot] = useState("");

  useEffect(() => {
    setFormState(createInitialState(defaultProductInterest));
    // Intentional: only reset when the caller explicitly changes the default.
  }, [defaultProductInterest]);

  const turnstileSiteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY as string | undefined;
  const requiresTurnstile = Boolean(turnstileSiteKey);

  const fallbackMailto = useMemo(() => {
    const body = [
      "Early Access Signup",
      "",
      `Email: ${formState.email}`,
      `Product interest: ${formState.productInterest}`,
      `Full name: ${formState.fullName || "-"}`,
      `Phone / WhatsApp: ${formState.phone || "-"}`,
      `Business name: ${formState.businessName || "-"}`,
      "",
      "Notes:",
      formState.notes || "-",
    ].join("\n");

    return `mailto:nitiance@gmail.com?subject=${encodeURIComponent(
      "Early Access Signup",
    )}&body=${encodeURIComponent(body)}`;
  }, [formState]);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formState.productInterest) {
      setSubmitError("Select a product interest before submitting.");
      return;
    }

    if (requiresTurnstile && !turnstileToken) {
      setSubmitError("Complete the spam protection check before submitting.");
      return;
    }

    setSubmitting(true);
    setSubmitError("");

    const attribution = getAttributionContext();
    const result = await submitLead({
      type: "waitlist",
      email: formState.email,
      productInterest: formState.productInterest,
      fullName: formState.fullName,
      phone: formState.phone,
      businessName: formState.businessName,
      notes: formState.notes,
      pageUrl: window.location.href,
      referrer: document.referrer || null,
      attribution,
      turnstileToken,
      honeypot,
    });

    if (result.ok) {
      setSubmitted(true);
      trackEvent("waitlist_submitted", {
        delivered: Boolean(result.delivered),
        product: formState.productInterest || "unknown",
        channel: attribution.firstTouch?.channel ?? "direct",
      });
    } else {
      setSubmitted(true);
      setSubmitError("Automated delivery failed, opening email fallback.");
      window.setTimeout(() => {
        window.location.href = fallbackMailto;
      }, 120);
    }

    setSubmitting(false);
  };

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-xl border border-[#D8CEC2] bg-white/80 p-6 md:p-8 shadow-[0_12px_30px_rgba(11,31,59,0.08)]"
    >
      <div className="grid md:grid-cols-2 gap-5 md:gap-6">
        <div>
          <label htmlFor="ea-email" className="block text-xs uppercase tracking-wide text-[#2B3440]/70 mb-2">
            Email
          </label>
          <input
            id="ea-email"
            type="email"
            required
            value={formState.email}
            onChange={(event) => setFormState((prev) => ({ ...prev, email: event.target.value }))}
            className="w-full rounded-lg border border-[#CFC3B5] bg-white px-3 py-2 text-sm text-[#0B0F14] focus:outline-none focus:ring-2 focus:ring-[#0B1F3B]"
          />
        </div>

        <div>
          <label htmlFor="ea-product" className="block text-xs uppercase tracking-wide text-[#2B3440]/70 mb-2">
            Product interest
          </label>
          <select
            id="ea-product"
            required
            value={formState.productInterest}
            onChange={(event) => setFormState((prev) => ({ ...prev, productInterest: event.target.value }))}
            className="w-full rounded-lg border border-[#CFC3B5] bg-white px-3 py-2 text-sm text-[#0B0F14] focus:outline-none focus:ring-2 focus:ring-[#0B1F3B]"
          >
            <option value="" disabled>
              Select a product
            </option>
            {productOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="ea-full-name" className="block text-xs uppercase tracking-wide text-[#2B3440]/70 mb-2">
            Full name (optional)
          </label>
          <input
            id="ea-full-name"
            value={formState.fullName}
            onChange={(event) => setFormState((prev) => ({ ...prev, fullName: event.target.value }))}
            className="w-full rounded-lg border border-[#CFC3B5] bg-white px-3 py-2 text-sm text-[#0B0F14] focus:outline-none focus:ring-2 focus:ring-[#0B1F3B]"
          />
        </div>

        <div>
          <label htmlFor="ea-phone" className="block text-xs uppercase tracking-wide text-[#2B3440]/70 mb-2">
            WhatsApp/Phone (optional)
          </label>
          <input
            id="ea-phone"
            value={formState.phone}
            onChange={(event) => setFormState((prev) => ({ ...prev, phone: event.target.value }))}
            className="w-full rounded-lg border border-[#CFC3B5] bg-white px-3 py-2 text-sm text-[#0B0F14] focus:outline-none focus:ring-2 focus:ring-[#0B1F3B]"
          />
        </div>

        <div className="md:col-span-2">
          <label htmlFor="ea-business" className="block text-xs uppercase tracking-wide text-[#2B3440]/70 mb-2">
            Business name (optional)
          </label>
          <input
            id="ea-business"
            value={formState.businessName}
            onChange={(event) => setFormState((prev) => ({ ...prev, businessName: event.target.value }))}
            className="w-full rounded-lg border border-[#CFC3B5] bg-white px-3 py-2 text-sm text-[#0B0F14] focus:outline-none focus:ring-2 focus:ring-[#0B1F3B]"
          />
        </div>

        <div className="md:col-span-2">
          <label htmlFor="ea-notes" className="block text-xs uppercase tracking-wide text-[#2B3440]/70 mb-2">
            Notes (optional)
          </label>
          <textarea
            id="ea-notes"
            rows={4}
            value={formState.notes}
            onChange={(event) => setFormState((prev) => ({ ...prev, notes: event.target.value }))}
            className="w-full rounded-lg border border-[#CFC3B5] bg-white px-3 py-2 text-sm text-[#0B0F14] placeholder:text-[#2B3440]/45 focus:outline-none focus:ring-2 focus:ring-[#0B1F3B]"
          />
        </div>
      </div>

      <div className="hidden" aria-hidden="true">
        <label htmlFor="ea-company-website">Company website</label>
        <input
          id="ea-company-website"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(event) => setHoneypot(event.target.value)}
        />
      </div>

      <div className="mt-6">
        <TurnstileWidget siteKey={turnstileSiteKey} onTokenChange={setTurnstileToken} theme="light" />
      </div>

      <div className="mt-8 flex flex-wrap gap-3 items-center">
        <button
          type="submit"
          disabled={submitting || (requiresTurnstile && !turnstileToken)}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#0B1F3B] disabled:opacity-60 disabled:cursor-not-allowed text-[#F7F3EE] text-sm font-medium px-4 py-2.5 hover:bg-[#0B1F3B]/90 transition-colors"
        >
          <Mail className="w-4 h-4" />
          {submitting ? "Submitting..." : "Join Early Access"}
        </button>

        {submitError && <p className="text-xs text-[#3B0D0D]">{submitError}</p>}
        {submitted && !submitError && (
          <p className="text-sm text-[#0F2A1D] font-medium">Sent. We'll reply shortly.</p>
        )}
      </div>
    </form>
  );
};

export default EarlyAccessForm;

