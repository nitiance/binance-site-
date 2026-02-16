import ScrollReveal from "@/components/animations/ScrollReveal";
import GradientBanner from "@/components/GradientBanner";

const Media = () => {
  return (
    <div>
      {/* Hero - Gradient Banner */}
      <GradientBanner 
        height="h-[50vh] sm:h-[60vh]" 
        title="The work, documented."
        subtitle="Media"
        showLogo={false}
      />

      {/* Philosophy - White */}
      <section className="bg-background">
        <div className="max-w-[1200px] mx-auto px-6 py-24 md:py-32">
          <div className="grid md:grid-cols-2 gap-16 md:gap-24">
            <ScrollReveal>
              <p className="text-xs text-muted-foreground tracking-tight uppercase mb-4">
                Philosophy
              </p>
              <h2 className="text-xl md:text-2xl font-serif font-bold tracking-tighter leading-tight">
                No hype. No thumbnails screaming at you.
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.15}>
              <div className="space-y-6 text-sm text-muted-foreground leading-relaxed">
                <p>
                  Just honest documentation of the work. The process. The setbacks.
                  The small victories.
                </p>
                <p>
                  This channel is for people who appreciate the craft — not the
                  shortcuts. For those who understand that building something real
                  takes time, patience, and discipline.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Platforms - Mid */}
      <section className="section-mid noise-texture">
        <div className="max-w-[1200px] mx-auto px-6 py-24 md:py-32">
          <ScrollReveal>
            <p className="text-xs tracking-tight uppercase mb-12 opacity-50">
              Platforms
            </p>
          </ScrollReveal>
          <div className="space-y-8">
            {[
              {
                platform: "YouTube",
                desc: "Long-form content. Deep dives into projects and process.",
                link: "https://youtube.com/@nitiance?si=XK80Oy_RPHqVYqkw",
              },
              {
                platform: "TikTok",
                desc: "Short clips. Quick insights and behind-the-scenes moments.",
                link: "https://www.tiktok.com/@nitiance?_r=1&_t=ZS-93jPukGw4X9",
              },
              {
                platform: "Instagram",
                desc: "Visual updates. Stills and stories from the journey.",
                link: "https://www.instagram.com/_nitiance?igsh=MWQ1dWlhYjk4ZnJmaA%3D%3D&utm_source=qr",
              },
            ].map((item, i) => (
              <ScrollReveal key={item.platform} delay={0.1 * i}>
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block py-6 border-b border-white/10 hover:border-white/30 transition-colors"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <h3 className="text-base font-bold tracking-tight">
                        {item.platform}
                      </h3>
                      <p className="mt-1 text-sm opacity-50">{item.desc}</p>
                    </div>
                    <span className="text-sm opacity-40 group-hover:opacity-100 transition-opacity">
                      Follow →
                    </span>
                  </div>
                </a>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA - Dark */}
      <section className="section-dark">
        <div className="max-w-[1200px] mx-auto px-6 py-20 text-center">
          <ScrollReveal>
            <p className="text-sm opacity-60 mb-6">
              New content every week. Subscribe to stay updated.
            </p>
            <a
              href="https://youtube.com/@nitiance?si=XK80Oy_RPHqVYqkw"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-sm font-medium border-b border-white/50 pb-0.5 hover:border-white transition-colors"
            >
              Watch on YouTube →
            </a>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};

export default Media;
