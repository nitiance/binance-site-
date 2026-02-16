import { FormEvent, useState } from "react";
import { Mail, MessageCircle } from "lucide-react";

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
  const [formState, setFormState] = useState<ContactFormState>(defaultState);
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const body = [
      `Name: ${formState.name}`,
      `Email: ${formState.email}`,
      `Business Name: ${formState.businessName}`,
      "",
      "Message:",
      formState.message,
    ].join("\n");

    const mailtoUrl = `mailto:nitiance@gmail.com?subject=${encodeURIComponent(
      "Client Contact",
    )}&body=${encodeURIComponent(body)}`;

    setSubmitted(true);
    window.setTimeout(() => {
      window.location.href = mailtoUrl;
    }, 120);
  };

  return (
    <div>
      <section className="bg-[#0B0F14] text-[#F7F3EE] border-b border-white/10">
        <div className="max-w-[1200px] mx-auto px-6 py-20 md:py-24">
          <p className="text-xs uppercase tracking-wide text-[#F7F3EE]/50 mb-4">Contact</p>
          <h1 className="text-3xl md:text-5xl font-semibold tracking-tight">Start a conversation</h1>
          <p className="mt-5 text-sm md:text-base text-[#F7F3EE]/75 max-w-xl leading-relaxed">
            Share your proposal, timeline, or business problem. You will get a direct reply.
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

          <form onSubmit={onSubmit} className="rounded-xl border border-[#D8CEC2] bg-white/80 p-6 md:p-8 shadow-[0_12px_30px_rgba(11,31,59,0.08)] space-y-5">
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

            <button
              type="submit"
              className="w-full rounded-lg bg-[#0B1F3B] text-[#F7F3EE] text-sm font-medium px-4 py-3 hover:bg-[#0B1F3B]/90 transition-colors"
            >
              Send
            </button>

            {submitted && (
              <p className="text-xs text-[#0F2A1D] font-medium">Sent. We'll reply shortly.</p>
            )}
          </form>
        </div>
      </section>
    </div>
  );
};

export default Contact;
