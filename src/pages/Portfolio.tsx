import ScrollReveal from "@/components/animations/ScrollReveal";
import GradientBanner from "@/components/GradientBanner";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    title: "Hwedza Medical Lab",
    type: "Client Project",
    description: "Medical laboratory website. Professional healthcare presence built with precision and care.",
    status: "Completed",
    link: "https://hwedza.com",
  },
  {
    title: "SuezBay",
    type: "Marketplace",
    description: "Zimbabwe's community marketplace. Cross-border commerce infrastructure for emerging markets.",
    status: "In build",
    link: null,
  },
];

const labsBuilds = [
  {
    name: "BinanceXI POS",
    status: "Early Access",
    description: "Integrated point of sale specifically built for pharmacies, retail, and repair shops in emerging markets.",
  },
] as const;

const Portfolio = () => {
  return (
    <div>
      {/* Hero - Gradient Banner */}
      <GradientBanner height="h-[60vh]" title="Built by Binance Labs." subtitle="Apps, sites, and systems" showLogo={false} />

      {/* Systems (Primary) */}
      <section id="systems" className="section-dark scroll-mt-20">
        <div className="max-w-[1200px] mx-auto px-6 py-16 md:py-24">
          <ScrollReveal>
            <p className="text-xs tracking-tight uppercase mb-6 opacity-50">Binance Labs</p>
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
              Business System Suite
            </h2>
            <p className="mt-4 text-sm text-white/70 leading-relaxed max-w-2xl">
              Integrated POS + inventory + analytics built for speed, auditability, and unstable connectivity.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.08}>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="https://binacepos.vercel.app/?demo=1"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-lg bg-[#F7F3EE] text-[#0B1F3B] text-sm font-semibold px-6 py-3 hover:bg-white transition-colors"
              >
                Try demo
              </a>
              <Link
                to="/contact?tab=request-system"
                className="inline-flex items-center justify-center rounded-lg border border-white/15 bg-white/5 text-white text-sm font-semibold px-6 py-3 hover:bg-white/10 transition-colors"
              >
                Request system
              </Link>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.12}>
            <div className="mt-12 grid md:grid-cols-3 gap-4">
              {[
                { title: "Fast checkout", desc: "Barcode/keyboard-first flow designed for daily volume." },
                { title: "Stock control", desc: "Low-stock visibility and inventory adjustments that make sense." },
                { title: "Reporting", desc: "Simple metrics your team can act on. Export-ready." },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-xl border border-white/10 bg-white/5 p-5"
                >
                  <p className="text-sm font-semibold">{item.title}</p>
                  <p className="mt-2 text-sm text-white/60 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Binance Labs (Factory) */}
      <section id="labs" className="bg-[#F7F3EE] border-y border-[#D8CEC2] scroll-mt-20">
        <div className="max-w-[1200px] mx-auto px-6 py-16 md:py-20">
          <ScrollReveal>
            <p className="text-xs uppercase tracking-wide text-[#2B3440]/60 mb-3">Binance Labs</p>
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-[#0B0F14]">
              The app and system factory.
            </h2>
            <p className="mt-5 text-sm text-[#2B3440]/75 leading-relaxed max-w-2xl">
              This is where we build and iterate. Early access is the clean way to get test builds without noise.
            </p>
          </ScrollReveal>

          <div className="mt-10 grid gap-4 max-w-md">
            {labsBuilds.map((build, i) => (
              <ScrollReveal key={build.name} delay={0.05 * i}>
                <div className="rounded-xl border border-[#D8CEC2] bg-white/80 p-5 shadow-[0_8px_24px_rgba(11,31,59,0.06)] h-full flex flex-col">
                  <div className="flex items-start justify-between gap-4">
                    <p className="text-sm font-semibold text-[#0B0F14]">{build.name}</p>
                    <span className="text-[10px] uppercase tracking-wide text-[#2B3440]/60 border border-[#D8CEC2] bg-white/70 px-2 py-1 rounded-full">
                      {build.status}
                    </span>
                  </div>
                  <p className="mt-3 text-sm text-[#2B3440]/75 leading-relaxed flex-1">
                    {build.description}
                  </p>
                  <div className="mt-4">
                    <Link
                      to={`/contact?tab=request-system`}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-[#0B1F3B] border-b border-[#0B1F3B]/40 pb-0.5 hover:border-[#0B1F3B] transition-colors"
                    >
                      Request System <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Projects List - White */}
      <section className="bg-background">
        <div className="max-w-[1200px] mx-auto px-6 py-16 md:py-24">
          <ScrollReveal>
            <p className="text-xs tracking-tight uppercase mb-6 opacity-50">Binance Labs</p>
          </ScrollReveal>

          {projects.map((project, i) => (
            <ScrollReveal key={project.title} delay={0.05 * i}>
              <div className="border-b border-border py-8 md:py-10 grid md:grid-cols-[1fr_2fr_auto] gap-6 md:gap-8 items-start">
                <div>
                  <p className="text-sm font-bold tracking-tight">{project.title}</p>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {project.description}
                </p>
                <div className="flex items-center gap-4">
                  <p className="text-xs text-muted-foreground">{project.status}</p>
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-medium text-foreground border-b border-foreground pb-0.5 hover:opacity-70 transition-opacity"
                    >
                      View →
                    </a>
                  )}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Portfolio;
