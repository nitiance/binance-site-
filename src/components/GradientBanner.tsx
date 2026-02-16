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
  subtitle
}: GradientBannerProps) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.3]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  return (
    <div
      ref={ref}
      className={`relative ${height} overflow-hidden flex items-center justify-center`}
    >
      {/* Animated gradient sweeping from the side */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-r from-black via-zinc-900 to-black"
        initial={{ x: "-100%" }}
        animate={{ x: "0%" }}
        transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
      />
      
      {/* Secondary gradient layer for depth */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-transparent via-zinc-800/20 to-transparent"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.5 }}
      />
      
      {/* Noise texture overlay */}
      <div className="absolute inset-0 noise-texture opacity-60" />
      
      {/* Radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.03)_0%,_transparent_70%)]" />

      <motion.div
        style={{ opacity, scale }}
        className="relative z-10 text-center px-6"
      >
        {showLogo && !title && (
          <>
            <motion.h1 
              className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter gradient-text select-none"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              BinanceXI
            </motion.h1>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.2, delay: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
              className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mt-4 sm:mt-6"
            />
          </>
        )}
        
        {title && (
          <>
            <motion.p 
              className="text-xs tracking-tight uppercase mb-3 sm:mb-4 opacity-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {subtitle}
            </motion.p>
            <motion.h1 
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter leading-[1.1] text-white max-w-[800px]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
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
