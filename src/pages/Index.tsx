import { Link } from "react-router-dom";
import GradientBanner from "@/components/GradientBanner";
import ScrollReveal from "@/components/animations/ScrollReveal";
import TextReveal from "@/components/animations/TextReveal";

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero - Gradient Banner */}
      <GradientBanner height="h-[70vh] md:h-[80vh]" />

      {/* Statement Section - White */}
      <section className="bg-background">
        <div className="max-w-[1200px] mx-auto px-6 py-24 md:py-32">
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
                  to="/contact?tab=request-system"
                  className="inline-flex items-center justify-center rounded-lg bg-[#0B1F3B] text-[#F7F3EE] text-sm font-semibold px-4 py-2.5 hover:bg-[#0B1F3B]/90 transition-colors"
                >
                  Request a system
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

      {/* POS Demo Strip */}
      <section className="bg-[#F7F3EE] border-y border-[#D8CEC2]">
        <div className="max-w-[1200px] mx-auto px-6 py-16 md:py-20">
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start">
            <ScrollReveal>
              <p className="text-xs uppercase tracking-tight text-[#2B3440]/60 mb-3">POS Demo</p>
              <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-[#0B0F14]">
                A real system, not a mockup.
              </h2>
              <p className="mt-5 text-sm text-[#2B3440]/75 leading-relaxed max-w-md">
                Explore checkout, stock updates, order history, and simple reporting in the live demo.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.08}>
              <div className="flex flex-wrap gap-4 md:justify-end">
                <Link
                  to="/demo/pos"
                  className="inline-flex items-center justify-center rounded-lg bg-[#0B1F3B] text-[#F7F3EE] text-sm font-semibold px-4 py-2.5 hover:bg-[#0B1F3B]/90 transition-colors"
                >
                  Try the demo
                </Link>
                <Link
                  to="/contact?tab=request-system"
                  className="inline-flex items-center justify-center rounded-lg border border-[#D8CEC2] bg-white/70 text-[#0B0F14] text-sm font-semibold px-4 py-2.5 hover:bg-white transition-colors"
                >
                  Request a system
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
