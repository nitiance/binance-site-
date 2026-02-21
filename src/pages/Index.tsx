import { Link } from "react-router-dom";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import GradientBanner from "@/components/GradientBanner";
import ScrollReveal from "@/components/animations/ScrollReveal";
import TextReveal from "@/components/animations/TextReveal";

const easeConfig = {
  duration: 1.4,
  ease: [0.25, 1, 0.35, 1] as const,
};

const POSDeviceSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="bg-[#080c12] overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 py-24 md:py-32">
        <div className="grid lg:grid-cols-[1.4fr_1fr] gap-16 lg:gap-24 items-center">

          {/* Devices — left column */}
          <div className="relative flex items-end justify-center min-h-[300px] sm:min-h-[420px] md:min-h-[520px] lg:min-h-[580px] w-full">

            {/* MacBook frame */}
            <motion.div
              initial={{ opacity: 0, x: -24, y: 10, rotate: -2 }}
              animate={isInView ? { opacity: 1, x: 0, y: 0, rotate: -1 } : {}}
              transition={{ ...easeConfig, duration: 2.0, delay: 0.2 }}
              className="will-animate absolute left-0 bottom-0 w-[88%] md:w-full max-w-[540px] z-10 origin-bottom-left"
              style={{ perspective: "1000px" }}
            >
              {/* Screen bezel */}
              <div className="rounded-xl bg-[#1a1f2e] border border-white/10 shadow-2xl overflow-hidden"
                style={{ boxShadow: "0 32px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.06)" }}>
                {/* Top bar */}
                <div className="flex items-center gap-1.5 px-3 py-2 bg-[#141820] border-b border-white/5">
                  <div className="w-2 h-2 rounded-full bg-[#FF5F57]" />
                  <div className="w-2 h-2 rounded-full bg-[#FFBD2E]" />
                  <div className="w-2 h-2 rounded-full bg-[#28C840]" />
                  <div className="flex-1 mx-3 h-4 rounded bg-[#0d1018] flex items-center px-2">
                    <span className="text-[7px] text-white/20 tracking-wide">binancepos.vercel.app</span>
                  </div>
                </div>
                {/* Screen content — desktop POS UI */}
                <div className="relative bg-[#0B0F14] aspect-[16/10] overflow-hidden">
                  <div className="absolute inset-0 flex">
                    {/* Left panel — hero/branding side */}
                    <div className="w-[46%] bg-gradient-to-br from-[#0d1828] via-[#0a1420] to-[#080c12] flex flex-col justify-center px-4 py-4"
                      style={{ background: "radial-gradient(ellipse 120% 80% at 40% 30%, rgba(30,80,160,0.22) 0%, transparent 70%), linear-gradient(135deg, #0d1828 0%, #080c12 100%)" }}>
                      <div className="text-[11px] font-bold text-white tracking-tight mb-1">BinanceXI <span className="text-[8px] font-normal bg-white/10 px-1 py-0.5 rounded text-white/60">POS</span></div>
                      <div className="text-[8px] text-white/40 mb-3">Point of Sale + Repairs</div>
                      <div className="text-[7px] text-white/25 leading-relaxed max-w-[90%]">Sales, services, and receipts managed in one fast offline-first workspace.</div>
                      <div className="mt-3 flex gap-1 flex-wrap">
                        <span className="text-[6px] bg-green-500/15 text-green-400 px-1.5 py-0.5 rounded-full border border-green-500/20">● Online</span>
                        <span className="text-[6px] bg-white/5 text-white/30 px-1.5 py-0.5 rounded-full border border-white/10">Desktop</span>
                        <span className="text-[6px] bg-white/5 text-white/30 px-1.5 py-0.5 rounded-full border border-white/10">Offline-First</span>
                      </div>
                    </div>
                    {/* Right panel — sign in */}
                    <div className="flex-1 bg-[#0d1118] flex flex-col items-center justify-center px-3 py-4 border-l border-white/5">
                      <div className="w-5 h-5 rounded-lg bg-blue-500/20 border border-blue-400/20 flex items-center justify-center mb-2">
                        <svg width="8" height="8" viewBox="0 0 16 16" fill="none"><path d="M8 1a4 4 0 100 8A4 4 0 008 1zM2 14s-1 0-1-1 1-4 7-4 7 3 7 4-1 1-1 1H2z" fill="rgba(96,165,250,0.7)" /></svg>
                      </div>
                      <div className="text-[10px] font-semibold text-white mb-0.5">Sign In</div>
                      <div className="text-[7px] text-white/30 mb-3">Enter your staff credentials</div>
                      <div className="w-full space-y-1.5">
                        <div className="w-full h-4 rounded bg-[#141c28] border border-white/10 flex items-center px-1.5">
                          <span className="text-[7px] text-white/20">Username</span>
                        </div>
                        <div className="w-full h-4 rounded bg-[#141c28] border border-white/10 flex items-center px-1.5">
                          <span className="text-[7px] text-white/20">Password</span>
                        </div>
                        <div className="w-full h-4 rounded bg-[#1a6fd4] flex items-center justify-center">
                          <span className="text-[7px] text-white font-medium">Access System</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* MacBook base */}
              <div className="h-2 bg-gradient-to-b from-[#2a2f3e] to-[#1a1f2e] rounded-b-sm mx-2" />
              <div className="h-1 bg-[#141820] rounded-b-lg mx-0 shadow-lg" />
            </motion.div>

            {/* Phone frame */}
            <motion.div
              initial={{ opacity: 0, x: 24, y: 16 }}
              animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
              transition={{ ...easeConfig, duration: 2.0, delay: 0.6 }}
              className="will-animate absolute right-0 bottom-[5%] md:bottom-8 w-[25%] md:w-[35%] max-w-[180px] min-w-[100px] z-20 origin-bottom-right"
            >
              <div className="rounded-[18px] bg-[#1a1f2e] border border-white/10 overflow-hidden"
                style={{ boxShadow: "0 24px 60px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.08)" }}>
                {/* Notch */}
                <div className="flex justify-center pt-2 pb-1 bg-[#141820]">
                  <div className="w-8 h-1 rounded-full bg-[#0d1018]" />
                </div>
                {/* Phone screen — mobile POS UI */}
                <div className="bg-[#0B0F14] px-2 py-2 min-h-[200px]">
                  {/* Logo area */}
                  <div className="flex justify-center mb-3">
                    <div className="bg-[#141c28] rounded-xl px-3 py-1.5">
                      <span className="text-[10px] font-bold text-white tracking-tight">BinanceXI <span className="text-[7px] font-normal bg-white/10 px-1 py-0.5 rounded text-white/50">POS</span></span>
                    </div>
                  </div>
                  {/* Shield icon */}
                  <div className="flex justify-center mb-2">
                    <div className="w-7 h-7 rounded-xl bg-blue-500/20 border border-blue-400/20 flex items-center justify-center">
                      <svg width="10" height="10" viewBox="0 0 16 16" fill="none"><path d="M8 1L2 4v4c0 3.5 2.5 6.5 6 7.5C11.5 14.5 14 11.5 14 8V4L8 1z" fill="rgba(96,165,250,0.6)" /><path d="M5.5 8l2 2 3-3" stroke="rgba(96,165,250,0.9)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </div>
                  </div>
                  <div className="text-center mb-3">
                    <div className="text-[11px] font-semibold text-white mb-0.5">Sign In</div>
                    <div className="text-[7px] text-white/30">Enter your staff credentials</div>
                  </div>
                  <div className="space-y-1.5 mb-2">
                    <div className="w-full h-5 rounded-lg bg-[#141c28] border border-blue-400/30 flex items-center px-2">
                      <span className="text-[7px] text-white/40">john</span>
                    </div>
                    <div className="w-full h-5 rounded-lg bg-[#141c28] border border-white/10 flex items-center px-2">
                      <span className="text-[7px] text-white/40">••••••••</span>
                    </div>
                    <div className="w-full h-5 rounded-lg bg-[#1a6fd4] flex items-center justify-center">
                      <span className="text-[7px] text-white font-medium">Access System</span>
                    </div>
                    <div className="w-full h-5 rounded-lg bg-[#141c28] border border-white/10 flex items-center justify-center">
                      <span className="text-[7px] text-white/50">Use Fingerprint</span>
                    </div>
                  </div>
                  <div className="text-center">
                    <span className="text-[6px] text-white/15 leading-relaxed">Offline-first sign-in uses your local password.</span>
                  </div>
                </div>
                {/* Home indicator */}
                <div className="flex justify-center py-1.5 bg-[#0B0F14]">
                  <div className="w-6 h-0.5 rounded-full bg-white/20" />
                </div>
              </div>
            </motion.div>

            {/* Ambient glow behind devices */}
            <div className="absolute inset-0 pointer-events-none"
              style={{ background: "radial-gradient(ellipse 70% 50% at 40% 80%, rgba(26,111,212,0.08) 0%, transparent 70%)" }} />
          </div>

          {/* Copy — right column */}
          <div className="lg:pl-4">
            <motion.p
              className="text-[10px] tracking-[0.2em] uppercase text-white/30 font-medium mb-5"
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ ...easeConfig, delay: 0.15 }}
            >
              Binance Labs — POS System
            </motion.p>

            <motion.h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-[1.05] mb-6"
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ ...easeConfig, delay: 0.2 }}
            >
              Your whole shop,<br />
              <span className="text-white/50">in one screen.</span>
            </motion.h2>

            <motion.p
              className="text-base text-white/40 leading-relaxed max-w-[400px] mb-10"
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ ...easeConfig, delay: 0.28 }}
            >
              Checkout, repairs, stock, and receipts — all offline-first, all synced when you're back online. Built for real businesses in the real world.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-3"
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ ...easeConfig, delay: 0.35 }}
            >
              <a
                href="https://binacepos.vercel.app/?demo=1"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-xl bg-white text-[#0B0F14] text-sm font-semibold px-6 py-3 hover:bg-white/90 transition-colors"
              >
                Try the demo
              </a>
              <Link
                to="/contact?tab=request-system"
                className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white text-sm font-semibold px-6 py-3 hover:bg-white/10 transition-colors"
              >
                Request a system
              </Link>
            </motion.div>

            {/* Feature pills */}
            <motion.div
              className="mt-10 flex flex-wrap gap-2"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.45 }}
            >
              {["Offline-First", "Keyboard-Driven", "Desktop + Mobile", "Cloud Sync"].map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] text-white/30 border border-white/8 rounded-full px-3 py-1 bg-white/3"
                >
                  {tag}
                </span>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <GradientBanner height="h-[85vh] md:h-screen" />

      {/* POS Device Demo Section */}
      <POSDeviceSection />

      {/* Statement Section */}
      <section className="bg-background">
        <div className="max-w-[1200px] mx-auto px-6 py-24 md:py-32">
          <div className="max-w-[720px]">
            <ScrollReveal>
              <p className="text-xs text-muted-foreground tracking-[0.15em] uppercase mb-6 font-medium">
                Software · Commerce · Community
              </p>
            </ScrollReveal>
            <TextReveal
              as="h2"
              className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tighter leading-[1.05]"
              delay={0.1}
            >
              Building systems that compound.
            </TextReveal>
            <ScrollReveal delay={0.2}>
              <p className="mt-8 text-base md:text-lg text-muted-foreground leading-relaxed max-w-[520px]">
                BinanceXI is a brand building software, commerce, and community.
                Based in Zimbabwe.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.3}>
              <div className="mt-12 flex flex-wrap items-center gap-4">
                <Link
                  to="/contact?tab=request-system"
                  className="inline-flex items-center justify-center rounded-xl bg-[#0B1F3B] text-[#F7F3EE] text-sm font-semibold px-6 py-3 hover:bg-[#0B1F3B]/90 transition-colors"
                >
                  Request a system
                </Link>
                <Link
                  to="/portfolio"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  View work →
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* SuezBay Teaser Section */}
      <section className="bg-[#0a0f1a] overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-6 py-24 md:py-32">
          <div className="max-w-[720px] mx-auto text-center">
            <ScrollReveal>
              <p className="text-xs text-muted-foreground tracking-[0.15em] uppercase mb-6 font-medium">
                Coming Soon · Marketplace
              </p>
            </ScrollReveal>
            <TextReveal
              as="h2"
              className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tighter leading-[1.05]"
              delay={0.1}
            >
              SuezBay
            </TextReveal>
            <ScrollReveal delay={0.2}>
              <p className="mt-8 text-base md:text-lg text-muted-foreground leading-relaxed max-w-[520px] mx-auto">
                Zimbabwe's community marketplace. Multi-vendor. Mobile-first.
                Built for the real economy. Buy, sell, and trade — from anywhere in Zimbabwe.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.3}>
              <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
                <a
                  href="https://wa.me/263782750867?text=Hi! I'm interested in SuezBay updates."
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-xl bg-white text-[#0a0f1a] text-sm font-semibold px-6 py-3 hover:bg-white/90 transition-colors"
                >
                  Follow the build →
                </a>
                <Link
                  to="/contact"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Learn more →
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Engineering Community Teaser Section */}
      <section className="bg-background">
        <div className="max-w-[1200px] mx-auto px-6 py-24 md:py-32">
          <div className="max-w-[720px] mx-auto text-center">
            <ScrollReveal>
              <p className="text-xs text-muted-foreground tracking-[0.15em] uppercase mb-6 font-medium">
                Coming Soon · Community
              </p>
            </ScrollReveal>
            <TextReveal
              as="h2"
              className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tighter leading-[1.05]"
              delay={0.1}
            >
              Build with us.
            </TextReveal>
            <ScrollReveal delay={0.2}>
              <p className="mt-8 text-base md:text-lg text-muted-foreground leading-relaxed max-w-[520px] mx-auto">
                An engineering community for builders in Zimbabwe and beyond.
                Share work, learn together, ship things.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.3}>
              <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
                <a
                  href="https://chat.whatsapp.com/JT6BKHi55Dq0FvirWUrA4z"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-xl bg-[#0B1F3B] text-[#F7F3EE] text-sm font-semibold px-6 py-3 hover:bg-[#0B1F3B]/90 transition-colors"
                >
                  Join the waitlist →
                </a>
                <a
                  href="https://youtube.com/@nitiance?si=XK80Oy_RPHqVYqkw"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white text-sm font-semibold px-6 py-3 hover:bg-white/10 transition-colors"
                >
                  YouTube
                </a>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
