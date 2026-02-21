import { FormEvent, useMemo, useState } from "react";
import { Mail, MessageCircle } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import GradientBanner from "@/components/GradientBanner";
import ScrollReveal from "@/components/animations/ScrollReveal";
import TurnstileWidget from "@/components/TurnstileWidget";
import RequestSystemForm from "@/components/leads/RequestSystemForm";
import { getAttributionContext } from "@/lib/attribution";
import { trackEvent } from "@/lib/analytics";
import { submitLead } from "@/lib/leads";

type ContactFormState = {
  name: string;
  email: string;
  businessName: string;
  message: string;
};

const defaultState: ContactFormState = {
  name: "",
  email: "",
  businessName: "",
  message: "",
};

const Contact = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get("tab") === "request-system" ? "request-system" : "contact";

  const [formState, setFormState] = useState<ContactFormState>(defaultState);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [honeypot, setHoneypot] = useState("");

  const turnstileSiteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY as string | undefined;
  const requiresTurnstile = Boolean(turnstileSiteKey);

  const fallbackMailto = useMemo(() => {
    const body = [
      `Name: ${formState.name}`,
      `Email: ${formState.email}`,
      `Business Name: ${formState.businessName}`,
      "",
      "Message:",
      formState.message,
    ].join("\n");

    return `mailto:nitiance@gmail.com?subject=${encodeURIComponent(
      "Client Contact",
    )}&body=${encodeURIComponent(body)}`;
  }, [formState]);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (requiresTurnstile && !turnstileToken) {
      setSubmitError("Complete the spam protection check before submitting.");
      return;
    }

    setSubmitting(true);
    setSubmitError("");

    const attribution = getAttributionContext();
    const result = await submitLead({
      type: "contact",
      name: formState.name,
      businessName: formState.businessName,
      email: formState.email,
      message: formState.message,
      pageUrl: window.location.href,
      referrer: document.referrer || null,
      attribution,
      turnstileToken,
      honeypot,
    });

    if (result.ok) {
      setSubmitted(true);
      trackEvent("contact_lead_submitted", {
        delivered: Boolean(result.delivered),
        channel: attribution.firstTouch?.channel ?? "direct",
      });
    } else {
      trackEvent("contact_lead_fallback_email", {
        reason: result.error ?? "unknown",
      });
      setSubmitError("Automated delivery failed, opening email fallback.");
      setSubmitted(true);
      window.setTimeout(() => {
        window.location.href = fallbackMailto;
      }, 120);
    }

    setSubmitting(false);
  };

  return (
    <div>
      {/* Hero - Gradient Banner */}
      <GradientBanner height="h-[60vh]" title="Contact" subtitle="Get in touch. We'll respond within 24 hours." showLogo={false} />
      <section className="bg-[#0B0F14] text-[#F7F3EE] border-b border-white/10">
        <div className="max-w-[1200px] mx-auto px-6 py-20 md:py-24">
          <p className="text-xs uppercase tracking-wide text-[#F7F3EE]/50 mb-4">Contact</p>
          <h1 className="text-3xl md:text-5xl font-semibold tracking-tight">
            {activeTab === "request-system" ? "Request a system" : "Start a conversation"}
          </h1>
          <p className="mt-5 text-sm md:text-base text-[#F7F3EE]/75 max-w-xl leading-relaxed">
            {activeTab === "request-system"
              ? "Configure what your business needs. Submission sends to email and opens WhatsApp."
              : "Share your proposal, timeline, or business problem. You will get a direct reply."}
          </p>
        </div>
      </section>

      <section className="bg-[#F7F3EE]">
        <div className="max-w-[1200px] mx-auto px-6 py-16 md:py-20 grid lg:grid-cols-[1fr_1.15fr] gap-10 lg:gap-16">
          <div className="space-y-5">
            <div className="rounded-xl border border-[#D8CEC2] bg-white/70 p-6 shadow-[0_8px_24px_rgba(11,31,59,0.06)]">
              <p className="text-xs uppercase tracking-wide text-[#2B3440]/60 mb-2">Email</p>
              <a
                href="mailto:nitiance@gmail.com"
                className="inline-flex items-center gap-2 text-sm text-[#0B1F3B] border-b border-[#0B1F3B]/40 pb-0.5 hover:border-[#0B1F3B] transition-colors"
              >
                <Mail className="w-4 h-4" />
                nitiance@gmail.com
              </a>
            </div>

            <div className="rounded-xl border border-[#D8CEC2] bg-white/70 p-6 shadow-[0_8px_24px_rgba(11,31,59,0.06)]">
              <p className="text-xs uppercase tracking-wide text-[#2B3440]/60 mb-2">WhatsApp Business</p>
              <a
                href="https://wa.me/263782750867?text=Hi%20Nitiance%2C%20I%20want%20to%20discuss%20a%20project."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-[#0F2A1D] border-b border-[#0F2A1D]/40 pb-0.5 hover:border-[#0F2A1D] transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                +263782750867
              </a>
            </div>

            <p className="text-xs text-[#2B3440]/70 leading-relaxed">
              For faster handling, include your business type, current workflow, and what outcome you need.
            </p>
          </div>

          <div className="space-y-4">
            <div className="inline-flex rounded-lg border border-[#D8CEC2] bg-white/70 p-1">
              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  setSubmitError("");
                  const next = new URLSearchParams(searchParams);
                  next.delete("tab");
                  setSearchParams(next);
                }}
                className={`px-3 py-2 text-xs font-semibold rounded-md transition-colors ${
                  activeTab === "contact" ? "bg-white text-[#0B0F14] shadow-sm" : "text-[#2B3440]/70 hover:text-[#0B0F14]"
                }`}
              >
                Contact
              </button>
              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  setSubmitError("");
                  const next = new URLSearchParams(searchParams);
                  next.set("tab", "request-system");
                  setSearchParams(next);
                }}
                className={`px-3 py-2 text-xs font-semibold rounded-md transition-colors ${
                  activeTab === "request-system"
                    ? "bg-white text-[#0B0F14] shadow-sm"
                    : "text-[#2B3440]/70 hover:text-[#0B0F14]"
                }`}
              >
                Request system
              </button>
            </div>

            {activeTab === "request-system" ? (
              <RequestSystemForm />
            ) : (
              <form
                onSubmit={onSubmit}
                className="rounded-xl border border-[#D8CEC2] bg-white/80 p-6 md:p-8 shadow-[0_12px_30px_rgba(11,31,59,0.08)] space-y-5"
              >
                <div>
                  <label htmlFor="contact-name" className="block text-xs uppercase tracking-wide text-[#2B3440]/70 mb-2">
                    Name
                  </label>
                  <input
                    id="contact-name"
                    required
                    value={formState.name}
                    onChange={(event) => setFormState((prev) => ({ ...prev, name: event.target.value }))}
                    className="w-full rounded-lg border border-[#CFC3B5] bg-white px-3 py-2 text-sm text-[#0B0F14] focus:outline-none focus:ring-2 focus:ring-[#0B1F3B]"
                  />
                </div>

                <div>
                  <label htmlFor="contact-email" className="block text-xs uppercase tracking-wide text-[#2B3440]/70 mb-2">
                    Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={formState.email}
                    onChange={(event) => setFormState((prev) => ({ ...prev, email: event.target.value }))}
                    className="w-full rounded-lg border border-[#CFC3B5] bg-white px-3 py-2 text-sm text-[#0B0F14] focus:outline-none focus:ring-2 focus:ring-[#0B1F3B]"
                  />
                </div>

                <div>
                  <label htmlFor="contact-business" className="block text-xs uppercase tracking-wide text-[#2B3440]/70 mb-2">
                    Business Name
                  </label>
                  <input
                    id="contact-business"
                    required
                    value={formState.businessName}
                    onChange={(event) => setFormState((prev) => ({ ...prev, businessName: event.target.value }))}
                    className="w-full rounded-lg border border-[#CFC3B5] bg-white px-3 py-2 text-sm text-[#0B0F14] focus:outline-none focus:ring-2 focus:ring-[#0B1F3B]"
                  />
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-xs uppercase tracking-wide text-[#2B3440]/70 mb-2">
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={5}
                    value={formState.message}
                    onChange={(event) => setFormState((prev) => ({ ...prev, message: event.target.value }))}
                    className="w-full rounded-lg border border-[#CFC3B5] bg-white px-3 py-2 text-sm text-[#0B0F14] focus:outline-none focus:ring-2 focus:ring-[#0B1F3B] resize-y"
                  />
                </div>

                <div className="hidden" aria-hidden="true">
                  <label htmlFor="contact-company-website">Company website</label>
                  <input
                    id="contact-company-website"
                    tabIndex={-1}
                    autoComplete="off"
                    value={honeypot}
                    onChange={(event) => setHoneypot(event.target.value)}
                  />
                </div>

                <TurnstileWidget siteKey={turnstileSiteKey} onTokenChange={setTurnstileToken} theme="light" />

                <button
                  type="submit"
                  disabled={submitting || (requiresTurnstile && !turnstileToken)}
                  className="w-full rounded-lg bg-[#0B1F3B] disabled:opacity-60 disabled:cursor-not-allowed text-[#F7F3EE] text-sm font-medium px-4 py-3 hover:bg-[#0B1F3B]/90 transition-colors"
                >
                  {submitting ? "Sending..." : "Send"}
                </button>

                {submitError && <p className="text-xs text-[#3B0D0D]">{submitError}</p>}
                {submitted && (
                  <p className="text-xs text-[#0F2A1D] font-medium">Sent. We'll reply shortly.</p>
                )}
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
