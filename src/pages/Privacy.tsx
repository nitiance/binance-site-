import ScrollReveal from "@/components/animations/ScrollReveal";

const Privacy = () => {
  return (
    <div>
      <section className="bg-[#0B0F14] text-[#F7F3EE] border-b border-white/10">
        <div className="max-w-[1200px] mx-auto px-6 py-20 md:py-24">
          <ScrollReveal>
            <p className="text-xs uppercase tracking-wide text-[#F7F3EE]/50 mb-4">Legal</p>
            <h1 className="text-3xl md:text-5xl font-serif font-semibold tracking-tight">
              Privacy Policy
            </h1>
            <p className="mt-5 text-sm md:text-base text-[#F7F3EE]/75 max-w-2xl leading-relaxed">
              This policy explains what data is collected on this site and how it is used.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="bg-[#F7F3EE]">
        <div className="max-w-[900px] mx-auto px-6 py-16 md:py-20 space-y-10">
          <div className="rounded-xl border border-[#D8CEC2] bg-white/70 p-6 shadow-[0_8px_24px_rgba(11,31,59,0.06)]">
            <h2 className="text-xl font-serif font-semibold tracking-tight text-[#0B0F14]">
              Data we collect
            </h2>
            <p className="mt-3 text-sm text-[#2B3440]/75 leading-relaxed">
              When you submit a form (Contact, Request System, Early Access), we collect the fields you provide.
              We also collect basic request metadata (page URL, referrer, and user agent) and a spam-protection token.
            </p>
          </div>

          <div className="rounded-xl border border-[#D8CEC2] bg-white/70 p-6 shadow-[0_8px_24px_rgba(11,31,59,0.06)]">
            <h2 className="text-xl font-serif font-semibold tracking-tight text-[#0B0F14]">
              Why we collect it
            </h2>
            <p className="mt-3 text-sm text-[#2B3440]/75 leading-relaxed">
              We use this information to respond to requests, provide early access to products, and reduce spam/abuse.
              We do not sell your information.
            </p>
          </div>

          <div className="rounded-xl border border-[#D8CEC2] bg-white/70 p-6 shadow-[0_8px_24px_rgba(11,31,59,0.06)]">
            <h2 className="text-xl font-serif font-semibold tracking-tight text-[#0B0F14]">
              Analytics
            </h2>
            <p className="mt-3 text-sm text-[#2B3440]/75 leading-relaxed">
              This site may use lightweight analytics to understand traffic and improve the website. Analytics are used
              to measure page views and form conversion events.
            </p>
          </div>

          <div className="rounded-xl border border-[#D8CEC2] bg-white/70 p-6 shadow-[0_8px_24px_rgba(11,31,59,0.06)]">
            <h2 className="text-xl font-serif font-semibold tracking-tight text-[#0B0F14]">
              Retention
            </h2>
            <p className="mt-3 text-sm text-[#2B3440]/75 leading-relaxed">
              Lead submissions are retained as long as needed to respond and provide support. You can request deletion
              by contacting us.
            </p>
          </div>

          <div className="rounded-xl border border-[#D8CEC2] bg-white/70 p-6 shadow-[0_8px_24px_rgba(11,31,59,0.06)]">
            <h2 className="text-xl font-serif font-semibold tracking-tight text-[#0B0F14]">
              Contact
            </h2>
            <p className="mt-3 text-sm text-[#2B3440]/75 leading-relaxed">
              Email: <a className="border-b border-[#0B1F3B]/40 hover:border-[#0B1F3B] text-[#0B1F3B]" href="mailto:nitiance@gmail.com">nitiance@gmail.com</a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Privacy;
