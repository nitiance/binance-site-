import ScrollReveal from "@/components/animations/ScrollReveal";
import GradientBanner from "@/components/GradientBanner";

const Labs = () => {
  return (
    <div>
      {/* Hero - Gradient Banner */}
      <GradientBanner 
        height="h-[50vh] sm:h-[60vh]" 
        title="The internal app factory."
        subtitle="Binance Labs"
        showLogo={false}
      />

      {/* Philosophy - White */}
      <section className="bg-background">
        <div className="max-w-[1200px] mx-auto px-6 py-24 md:py-32">
          <div className="grid md:grid-cols-2 gap-16 md:gap-24">
            <ScrollReveal>
              <p className="text-xs text-muted-foreground tracking-tight uppercase mb-4">
                Approach
              </p>
              <h2 className="text-xl md:text-2xl font-serif font-bold tracking-tighter leading-tight">
                Ship fast. Learn faster.
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.15}>
              <div className="space-y-6 text-sm text-muted-foreground leading-relaxed">
                <p>
                  Binance Labs is not a venture studio. It's an internal R&D arm
                  focused on rapid experimentation and skill development.
                </p>
                <p>
                  Every project here teaches something new — a technology, a pattern,
                  or a principle. Some become products. Most become lessons.
                </p>
                <p>
                  The goal isn't to build everything. It's to build enough to stay sharp.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Focus Areas - Mid */}
      <section className="section-mid noise-texture">
        <div className="max-w-[1200px] mx-auto px-6 py-24 md:py-32">
          <ScrollReveal>
            <p className="text-xs tracking-tight uppercase mb-12 opacity-50">
              Focus Areas
            </p>
          </ScrollReveal>
          <div className="grid md:grid-cols-3 gap-12 md:gap-8">
            {[
              {
                title: "Web Applications",
                desc: "Full-stack products with clean architecture and intentional design.",
              },
              {
                title: "Developer Tools",
                desc: "CLI utilities, automation scripts, and workflow optimizations.",
              },
              {
                title: "Mobile Experiments",
                desc: "Native and cross-platform prototypes for emerging ideas.",
              },
            ].map((item, i) => (
              <ScrollReveal key={item.title} delay={0.1 * i}>
                <h3 className="text-base font-bold tracking-tight">{item.title}</h3>
                <p className="mt-3 text-sm opacity-60 leading-relaxed">
                  {item.desc}
                </p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Status - Dark */}
      <section className="section-dark">
        <div className="max-w-[1200px] mx-auto px-6 py-20">
          <ScrollReveal>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <p className="text-xs tracking-tight uppercase mb-2 opacity-50">
                  Current Status
                </p>
                <p className="text-sm opacity-70">
                  Multiple projects in active development. Updates shared via YouTube.
                </p>
              </div>
              <a
                href="https://youtube.com/@nitiance?si=XK80Oy_RPHqVYqkw"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium border-b border-white/50 pb-0.5 hover:border-white transition-colors"
              >
                Follow the journey →
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};

export default Labs;
