import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface GradientBannerProps {
  showLogo?: boolean;
  height?: string;
  title?: string;
  subtitle?: string;
}

const GradientBanner = ({
  showLogo = true,
  height = "h-[60vh]",
  title,
  subtitle,
}: GradientBannerProps) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const contentY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <div
      ref={ref}
      className={`relative ${height} overflow-hidden flex items-center justify-center`}
    >
      {/* Base background */}
      <motion.div
        className="absolute inset-0 gradient-banner"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      />

      {/* Animated ambient orb — top center */}
      <motion.div
        className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(40, 100, 220, 0.18) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
      />

      {/* Secondary orb — bottom left */}
      <motion.div
        className="absolute bottom-[-5%] left-[-5%] w-[400px] h-[300px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(20, 60, 140, 0.12) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2.5, delay: 0.3, ease: "easeOut" }}
      />

      {/* Subtle horizontal light line */}
      <motion.div
        className="absolute top-1/2 left-0 right-0 h-px pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.04) 30%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.04) 70%, transparent 100%)",
        }}
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 1.8, delay: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      />

      {/* Content */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 text-center px-6 will-animate"
      >
        {showLogo && !title && (
          <>
            {/* Eyebrow label */}
            <motion.p
              className="text-[10px] sm:text-xs tracking-[0.2em] uppercase text-white/30 mb-6 sm:mb-8 font-medium"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            >
              Labs · SuezBay · Community
            </motion.p>

            {/* Main wordmark */}
            <motion.h1
              className="text-5xl sm:text-7xl md:text-8xl lg:text-[9rem] font-bold tracking-tighter gradient-text select-none leading-none"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                type: "spring",
                stiffness: 70,
                damping: 25,
                delay: 0.3,
              }}
            >
              BinanceXI
            </motion.h1>

            {/* Divider line */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 1, delay: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
              className="h-px bg-gradient-to-r from-transparent via-white/15 to-transparent mt-6 sm:mt-8 max-w-[320px] mx-auto"
            />

            {/* Tagline */}
            <motion.p
              className="mt-5 sm:mt-6 text-sm sm:text-base text-white/40 tracking-wide max-w-[340px] mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.85, ease: [0.25, 0.1, 0.25, 1] }}
            >
              Building systems that compound.
            </motion.p>

            {/* Scroll cue */}
            <motion.div
              className="mt-12 sm:mt-16 flex flex-col items-center gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              <span className="text-[10px] tracking-[0.18em] uppercase text-white/20 font-medium">
                Scroll
              </span>
              <motion.div
                className="w-px h-8 bg-gradient-to-b from-white/20 to-transparent"
                animate={{ scaleY: [1, 0.4, 1], opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
          </>
        )}

        {title && (
          <>
            <motion.p
              className="text-xs tracking-[0.15em] uppercase mb-4 text-white/30 font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {subtitle}
            </motion.p>
            <motion.h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter leading-[1.1] text-white max-w-[800px]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                type: "spring",
                stiffness: 70,
                damping: 25,
                delay: 0.35,
              }}
            >
              {title}
            </motion.h1>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default GradientBanner;
