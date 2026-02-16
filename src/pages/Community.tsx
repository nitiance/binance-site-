import ScrollReveal from "@/components/animations/ScrollReveal";
import GradientBanner from "@/components/GradientBanner";

const Community = () => {
  return (
    <div>
      {/* Hero - Gradient Banner */}
      <GradientBanner 
        height="h-[50vh] sm:h-[60vh]" 
        title="Builders building builders."
        subtitle="Community"
        showLogo={false}
      />

      {/* What We Do - White */}
      <section className="bg-background">
        <div className="max-w-[1200px] mx-auto px-6 py-24 md:py-32">
          <div className="grid md:grid-cols-2 gap-16 md:gap-24">
            <ScrollReveal>
              <p className="text-xs text-muted-foreground tracking-tight uppercase mb-4">
                What We Do
              </p>
              <h2 className="text-xl md:text-2xl font-serif font-bold tracking-tighter leading-tight">
                Real projects. Real skills.
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.15}>
              <div className="space-y-6 text-sm text-muted-foreground leading-relaxed">
                <p>
                  This isn't a Discord server with 10,000 members and zero
                  activity. It's a small, focused group of people who actually ship.
                </p>
                <p>
                  We collaborate on real projects, share knowledge openly, and
                  hold each other to high standards. No certificates. No courses.
                  Just work.
                </p>
                <p>
                  If you're serious about building, you'll find your people here.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Values - Dark */}
      <section className="section-dark noise-texture">
        <div className="max-w-[1200px] mx-auto px-6 py-24 md:py-32">
          <ScrollReveal>
            <p className="text-xs tracking-tight uppercase mb-12 opacity-50">
              Values
            </p>
          </ScrollReveal>
          <div className="grid md:grid-cols-3 gap-12 md:gap-8">
            {[
              {
                title: "Craft Over Speed",
                desc: "We value quality. Rushing to ship broken code helps no one.",
              },
              {
                title: "Show, Don't Tell",
                desc: "Talk is cheap. We judge by output, not promises.",
              },
              {
                title: "Long-Term Thinking",
                desc: "We're building careers, not just projects. Patience pays.",
              },
            ].map((item, i) => (
              <ScrollReveal key={item.title} delay={0.1 * i}>
                <h3 className="text-base font-bold tracking-tight">{item.title}</h3>
                <p className="mt-3 text-sm opacity-50 leading-relaxed">
                  {item.desc}
                </p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Join - White */}
      <section className="bg-background border-t border-border">
        <div className="max-w-[1200px] mx-auto px-6 py-20">
          <ScrollReveal>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <p className="text-xs text-muted-foreground tracking-tight uppercase mb-2">
                  Status
                </p>
                <p className="text-sm text-muted-foreground">
                  Currently invite-only. Follow for updates.
                </p>
              </div>
              <a
                href="https://youtube.com/@nitiance?si=XK80Oy_RPHqVYqkw"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-foreground border-b border-foreground pb-0.5 hover:opacity-70 transition-opacity"
              >
                Subscribe on YouTube →
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};

export default Community;
