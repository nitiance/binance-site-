import { useEffect } from "react";
import { Link } from "react-router-dom";
import ScrollReveal from "@/components/animations/ScrollReveal";
import SystemCardGrid from "@/components/systems/SystemCardGrid";
import { systemCards } from "@/config/systems";
import { trackEvent } from "@/lib/analytics";

const Systems = () => {
  useEffect(() => {
    trackEvent("systems_page_viewed");
  }, []);

  return (
    <div>
      <section className="bg-[#0B0F14] text-[#F7F3EE] border-b border-white/10">
        <div className="max-w-[1200px] mx-auto px-6 py-20 md:py-24">
          <ScrollReveal>
            <p className="text-xs uppercase tracking-wide text-[#F7F3EE]/50 mb-4">Systems</p>
            <h1 className="text-3xl md:text-5xl font-serif font-semibold tracking-tight">
              Operational software for real businesses.
            </h1>
            <p className="mt-5 text-sm md:text-base text-[#F7F3EE]/75 max-w-2xl leading-relaxed">
              POS, inventory, analytics, and offline resilience. Built to be fast, auditable, and usable every day.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <div className="mt-8 flex flex-wrap gap-6">
              <Link
                to="/request-system"
                className="inline-flex items-center justify-center rounded-lg bg-[#F7F3EE] text-[#0B1F3B] text-sm font-semibold px-4 py-2.5 hover:bg-white transition-colors"
              >
                Request System
              </Link>
              <Link
                to="/portfolio"
                className="text-sm font-medium border-b border-[#F7F3EE]/60 pb-0.5 hover:border-[#F7F3EE] transition-colors"
              >
                View work
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="bg-[#F7F3EE]">
        <div className="max-w-[1200px] mx-auto px-6 py-16 md:py-20">
          <ScrollReveal>
            <p className="text-xs uppercase tracking-wide text-[#2B3440]/60 mb-6">Directory</p>
          </ScrollReveal>
          <ScrollReveal delay={0.05}>
            <SystemCardGrid cards={systemCards} />
          </ScrollReveal>
        </div>
      </section>

      <section className="bg-[#F7F3EE] border-t border-[#D8CEC2]">
        <div className="max-w-[1200px] mx-auto px-6 py-16 md:py-20 grid lg:grid-cols-2 gap-10 lg:gap-16">
          <ScrollReveal>
            <p className="text-xs uppercase tracking-wide text-[#2B3440]/60 mb-4">How engagements work</p>
            <h2 className="text-2xl md:text-3xl font-serif font-semibold tracking-tight text-[#0B0F14]">
              Clear scope. Clean delivery.
            </h2>
            <p className="mt-5 text-sm text-[#2B3440]/75 leading-relaxed max-w-md">
              The goal is a system your staff can actually operate. We prioritize speed, clarity, and supportability.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <div className="space-y-4">
              {[
                { title: "1) Discovery", desc: "Workflow review, constraints, and required modules." },
                { title: "2) Specification", desc: "Screens, roles, reports, and data model agreement." },
                { title: "3) Build + Iteration", desc: "Weekly checkpoints with real usage feedback." },
                { title: "4) Deployment + Support", desc: "Install, training notes, and a recovery runbook." },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-xl border border-[#D8CEC2] bg-white/70 p-5 shadow-[0_8px_24px_rgba(11,31,59,0.06)]"
                >
                  <p className="text-sm font-semibold text-[#0B0F14]">{item.title}</p>
                  <p className="mt-2 text-sm text-[#2B3440]/75 leading-relaxed">{item.desc}</p>
                </div>
              ))}
              <div className="pt-2">
                <Link
                  to="/request-system"
                  className="inline-flex items-center justify-center rounded-lg bg-[#0B1F3B] text-[#F7F3EE] text-sm font-semibold px-4 py-2.5 hover:bg-[#0B1F3B]/90 transition-colors"
                >
                  Request a system
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};

export default Systems;
