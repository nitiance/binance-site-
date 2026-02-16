import { Link, useParams } from "react-router-dom";
import { CheckCircle2, Mail, MessageCircle } from "lucide-react";
import ScrollReveal from "@/components/animations/ScrollReveal";
import { getSystemById, systemCards } from "@/config/systems";
import SystemCardGrid from "@/components/systems/SystemCardGrid";

const SystemDetail = () => {
  const { systemId = "" } = useParams();
  const system = getSystemById(systemId);

  if (!system) {
    return (
      <section className="bg-[#0B0F14] text-[#F7F3EE] min-h-[70vh]">
        <div className="max-w-[1200px] mx-auto px-6 py-24">
          <p className="text-xs uppercase tracking-wide text-[#F7F3EE]/50 mb-4">Systems</p>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">System not found</h1>
          <p className="mt-4 text-sm text-[#F7F3EE]/70 max-w-md">
            This page is unavailable. Use the systems directory to open a valid system page.
          </p>
          <Link
            to="/portfolio"
            className="inline-flex mt-8 text-sm border-b border-[#F7F3EE]/60 pb-0.5 hover:border-[#F7F3EE] transition-colors"
          >
            Back to portfolio
          </Link>
        </div>
      </section>
    );
  }

  const remainingSystems = systemCards.filter((item) => item.id !== system.id);

  return (
    <div>
      <section className="bg-[#0B0F14] text-[#F7F3EE] border-b border-white/10">
        <div className="max-w-[1200px] mx-auto px-6 py-20 md:py-24">
          <ScrollReveal>
            <p className="text-xs uppercase tracking-wide text-[#F7F3EE]/50 mb-4">System</p>
            <h1 className="text-3xl md:text-5xl font-semibold tracking-tight">{system.title}</h1>
            <p className="mt-5 text-sm md:text-base text-[#F7F3EE]/75 max-w-2xl leading-relaxed">
              {system.intro}
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <div className="mt-8 flex flex-wrap gap-5 text-sm">
              <Link
                to="/request-system"
                className="inline-flex items-center gap-2 border-b border-[#F7F3EE]/60 pb-0.5 hover:border-[#F7F3EE] transition-colors"
              >
                <Mail className="w-4 h-4" />
                Request this system
              </Link>
              <a
                href="https://wa.me/263782750867?text=Hi%20Nitiance%2C%20I%20want%20to%20discuss%20the%20system%20on%20your%20site."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border-b border-[#F7F3EE]/40 pb-0.5 hover:border-[#F7F3EE]/80 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="bg-[#F7F3EE]">
        <div className="max-w-[1200px] mx-auto px-6 pt-16 md:pt-20">
          <ScrollReveal>
            <p className="text-xs uppercase tracking-wide text-[#2B3440]/60 mb-5">Preview</p>
            <div className="grid md:grid-cols-3 gap-4">
              {system.previews.map((preview) => (
                <div
                  key={preview.title}
                  className="rounded-xl border border-[#D8CEC2] bg-white/80 p-5 shadow-[0_8px_24px_rgba(11,31,59,0.06)] min-h-[128px]"
                >
                  <p className="text-sm font-medium text-[#0B0F14]">{preview.title}</p>
                  <p className="text-sm text-[#2B3440]/75 mt-2 leading-relaxed">{preview.detail}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>

        <div className="max-w-[1200px] mx-auto px-6 py-14 md:py-16 grid lg:grid-cols-2 gap-10 lg:gap-16">
          <ScrollReveal>
            <p className="text-xs uppercase tracking-wide text-[#2B3440]/60 mb-5">Core highlights</p>
            <div className="space-y-4">
              {system.highlights.map((highlight) => (
                <div key={highlight} className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 mt-1 text-[#0B1F3B]" />
                  <p className="text-sm text-[#2B3440] leading-relaxed">{highlight}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <p className="text-xs uppercase tracking-wide text-[#2B3440]/60 mb-5">What you get</p>
            <div className="space-y-4">
              {system.delivery.map((item) => (
                <div
                  key={item}
                  className="rounded-xl border border-[#D8CEC2] bg-white/70 p-4 shadow-[0_8px_24px_rgba(11,31,59,0.06)]"
                >
                  <p className="text-sm text-[#0B0F14]">{item}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="bg-[#F7F3EE] border-t border-[#D8CEC2]">
        <div className="max-w-[1200px] mx-auto px-6 py-16 md:py-20">
          <ScrollReveal>
            <p className="text-xs uppercase tracking-wide text-[#2B3440]/60 mb-5">Other systems</p>
          </ScrollReveal>
          <ScrollReveal delay={0.05}>
            <SystemCardGrid cards={remainingSystems} />
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};

export default SystemDetail;
