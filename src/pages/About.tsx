import ScrollReveal from "@/components/animations/ScrollReveal";
import GradientBanner from "@/components/GradientBanner";

const About = () => {
  return (
    <div>
      {/* Hero - Gradient Banner */}
      <GradientBanner 
        height="h-[50vh] sm:h-[60vh]" 
        title="Engineering discipline. Long-term thinking."
        subtitle="About"
        showLogo={false}
      />

      {/* Story - White */}
      <section className="bg-background">
        <div className="max-w-[1200px] mx-auto px-6 py-24 md:py-32">
          <div className="grid md:grid-cols-2 gap-16 md:gap-24">
            <ScrollReveal>
              <p className="text-xs text-muted-foreground tracking-tight uppercase mb-4">
                Origin
              </p>
              <h2 className="text-xl md:text-2xl font-bold tracking-tighter leading-tight">
                Founded on a simple premise.
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.15}>
              <div className="space-y-6 text-sm text-muted-foreground leading-relaxed">
                <p>
                  BinanceXI was founded on a simple premise: build real things,
                  learn by doing, and let the work speak for itself.
                </p>
                <p>
                  Based in Zimbabwe, we operate at the intersection of software
                  engineering, product development, and community building. Our
                  focus is on creating systems that last — not trends that fade.
                </p>
                <p>
                  Every project under BinanceXI is built with the same
                  principles: clarity of thought, disciplined execution, and a
                  commitment to craftsmanship over shortcuts.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Vision - Mid */}
      <section className="section-mid noise-texture">
        <div className="max-w-[1200px] mx-auto px-6 py-32 md:py-40">
          <div className="max-w-[720px] mx-auto text-center">
            <ScrollReveal>
              <p className="text-xs tracking-tight uppercase mb-8 opacity-50">
                Vision
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <blockquote className="text-xl md:text-2xl lg:text-3xl font-bold tracking-tighter leading-tight">
                "We believe Africa's next generation of technology will be
                built by small, focused teams who refuse to compromise on quality."
              </blockquote>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Facts - Dark */}
      <section className="section-dark">
        <div className="max-w-[1200px] mx-auto px-6 py-20">
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { label: "Founded", value: "Zimbabwe" },
              { label: "Focus", value: "Software & Systems" },
              { label: "Philosophy", value: "Build. Learn. Repeat." },
            ].map((item, i) => (
              <ScrollReveal key={item.label} delay={0.1 * i}>
                <p className="text-xs tracking-tight uppercase opacity-40">
                  {item.label}
                </p>
                <p className="mt-2 text-base font-bold tracking-tight">
                  {item.value}
                </p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
