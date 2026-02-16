import ScrollReveal from "@/components/animations/ScrollReveal";

const Terms = () => {
  return (
    <div>
      <section className="bg-[#0B0F14] text-[#F7F3EE] border-b border-white/10">
        <div className="max-w-[1200px] mx-auto px-6 py-20 md:py-24">
          <ScrollReveal>
            <p className="text-xs uppercase tracking-wide text-[#F7F3EE]/50 mb-4">Legal</p>
            <h1 className="text-3xl md:text-5xl font-serif font-semibold tracking-tight">
              Terms of Use
            </h1>
            <p className="mt-5 text-sm md:text-base text-[#F7F3EE]/75 max-w-2xl leading-relaxed">
              These terms apply to the website and any downloadable builds published here.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="bg-[#F7F3EE]">
        <div className="max-w-[900px] mx-auto px-6 py-16 md:py-20 space-y-10">
          <div className="rounded-xl border border-[#D8CEC2] bg-white/70 p-6 shadow-[0_8px_24px_rgba(11,31,59,0.06)]">
            <h2 className="text-xl font-serif font-semibold tracking-tight text-[#0B0F14]">
              No warranty
            </h2>
            <p className="mt-3 text-sm text-[#2B3440]/75 leading-relaxed">
              Software builds may be experimental. They are provided "as is" without warranty of any kind.
            </p>
          </div>

          <div className="rounded-xl border border-[#D8CEC2] bg-white/70 p-6 shadow-[0_8px_24px_rgba(11,31,59,0.06)]">
            <h2 className="text-xl font-serif font-semibold tracking-tight text-[#0B0F14]">
              Liability
            </h2>
            <p className="mt-3 text-sm text-[#2B3440]/75 leading-relaxed">
              You are responsible for how you use any provided software. We are not liable for damages or losses
              resulting from usage, installation, or reliance on outputs.
            </p>
          </div>

          <div className="rounded-xl border border-[#D8CEC2] bg-white/70 p-6 shadow-[0_8px_24px_rgba(11,31,59,0.06)]">
            <h2 className="text-xl font-serif font-semibold tracking-tight text-[#0B0F14]">
              Distribution
            </h2>
            <p className="mt-3 text-sm text-[#2B3440]/75 leading-relaxed">
              Do not re-host or redistribute builds without explicit permission. Use official release links when
              sharing.
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

export default Terms;
