import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import GradientBanner from "@/components/GradientBanner";
import ScrollReveal from "@/components/animations/ScrollReveal";
import TextReveal from "@/components/animations/TextReveal";
import SystemCardGrid from "@/components/systems/SystemCardGrid";
import { systemCards } from "@/config/systems";

const divisions = [
  {
    title: "Binance Labs",
    desc: "Internal app factory and R&D. Learning by building.",
    link: "/labs",
  },
  {
    title: "SuezBay",
    desc: "Marketplace infrastructure for Zimbabwe. In production.",
    link: "/portfolio",
  },
  {
    title: "Community",
    desc: "A growing network of builders across Africa.",
    link: "/community",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero - Gradient Banner */}
      <GradientBanner height="h-screen" />

      {/* Statement Section - White */}
      <section className="bg-background">
        <div className="max-w-[1200px] mx-auto px-6 py-32 md:py-40">
          <div className="max-w-[720px]">
            <ScrollReveal>
              <p className="text-xs text-muted-foreground tracking-tight uppercase mb-6">
                Technology Company
              </p>
            </ScrollReveal>
            <TextReveal
              as="h2"
              className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tighter leading-[1.05]"
              delay={0.1}
            >
              Building systems that compound.
            </TextReveal>
            <ScrollReveal delay={0.3}>
              <p className="mt-8 text-base md:text-lg text-muted-foreground leading-relaxed max-w-[520px]">
                BinanceXI is a technology company focused on engineering,
                software, and long-term infrastructure. Based in Zimbabwe.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.4}>
              <div className="mt-12 flex flex-wrap items-center gap-6">
                <Link
                  to="/request-system"
                  className="inline-flex items-center justify-center rounded-lg bg-[#0B1F3B] text-[#F7F3EE] text-sm font-semibold px-4 py-2.5 hover:bg-[#0B1F3B]/90 transition-colors"
                >
                  Request a system
                </Link>
                <Link
                  to="/systems"
                  className="text-sm font-medium text-foreground border-b border-foreground pb-0.5 hover:opacity-70 transition-opacity"
                >
                  View modules
                </Link>
                <Link
                  to="/portfolio"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  View work
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Divisions - Dark */}
      <section className="section-dark noise-texture">
        <div className="max-w-[1200px] mx-auto px-6 py-24 md:py-32">
          <ScrollReveal>
            <p className="text-xs tracking-tight uppercase mb-12 opacity-50">
              Divisions
            </p>
          </ScrollReveal>
          <div className="grid md:grid-cols-3 gap-12 md:gap-8">
            {divisions.map((item, i) => (
              <ScrollReveal key={item.title} delay={0.1 * i}>
                <Link to={item.link} className="group block">
                  <h3 className="text-lg font-bold tracking-tight">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                    {item.desc}
                  </p>
                  <motion.span
                    className="mt-4 inline-block text-sm opacity-40 group-hover:opacity-100 transition-opacity"
                    whileHover={{ x: 4 }}
                  >
                    →
                  </motion.span>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy - Mid Grey */}
      <section className="section-mid noise-texture">
        <div className="max-w-[1200px] mx-auto px-6 py-32 md:py-40">
          <div className="max-w-[640px] mx-auto text-center">
            <ScrollReveal>
              <p className="text-xs tracking-tight uppercase mb-8 opacity-50">
                Philosophy
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <blockquote className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tighter leading-tight">
                "Build real things. Learn by doing. Let the work speak for itself."
              </blockquote>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Systems Divider + Widgets */}
      <section className="bg-[#F7F3EE] border-y border-[#D8CEC2]">
        <div className="max-w-[1200px] mx-auto px-6 py-20 md:py-24">
          <ScrollReveal>
            <div className="mb-8 md:mb-10">
              <p className="text-xs uppercase tracking-tight text-[#2B3440]/60 mb-3">
                Systems
              </p>
              <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-[#0B0F14]">
                One suite, modular components.
              </h2>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.05}>
            <SystemCardGrid cards={systemCards.slice(0, 3)} />
          </ScrollReveal>
        </div>
      </section>

      {/* Collaboration - White */}
      <section className="bg-background border-t border-border">
        <div className="max-w-[1200px] mx-auto px-6 py-24 md:py-32">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <ScrollReveal>
              <p className="text-xs text-muted-foreground tracking-tight uppercase mb-4">
                Collaboration
              </p>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tighter leading-tight">
                Open to working
                <br />
                with serious people.
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.15}>
              <div className="space-y-6 text-sm text-muted-foreground leading-relaxed">
                <p>
                  I build apps and business systems (POS, inventory, analytics). Web work is only for selected clients.
                </p>
                <div className="pt-2 flex flex-wrap gap-6">
                  <Link
                    to="/contact"
                    className="text-sm font-medium text-foreground border-b border-foreground pb-0.5 hover:opacity-70 transition-opacity"
                  >
                    Get in touch
                  </Link>
                  <Link
                    to="/request-system"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Request a system
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Media Divider - Dark */}
      <section className="section-dark border-t border-white/5">
        <div className="max-w-[1200px] mx-auto px-6 py-20">
          <ScrollReveal>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <p className="text-xs tracking-tight uppercase mb-2 opacity-50">
                  Media
                </p>
                <p className="text-sm opacity-70">
                  Cinematic developer content. Software life, documented.
                </p>
              </div>
              <a
                href="https://youtube.com/@nitiance?si=XK80Oy_RPHqVYqkw"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium border-b border-white/50 pb-0.5 hover:border-white transition-colors"
              >
                Watch on YouTube →
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};

export default Index;
