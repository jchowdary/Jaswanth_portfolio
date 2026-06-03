"use client";

import { motion, MotionValue, useTransform } from "framer-motion";

interface OverlayProps {
  scrollYProgress: MotionValue<number>;
}

export default function Overlay({ scrollYProgress }: OverlayProps) {
  // Section 1: Center Aligned (Scroll progress 0% to 22%)
  const s1Opacity = useTransform(scrollYProgress, [0, 0.14, 0.22], [1, 1, 0]);
  const s1Y = useTransform(scrollYProgress, [0, 0.22], [0, -80]);
  const s1Scale = useTransform(scrollYProgress, [0, 0.22], [1, 0.93]);

  // Section 2: Left Aligned (Scroll progress 22% to 46%)
  const s2Opacity = useTransform(scrollYProgress, [0.22, 0.28, 0.40, 0.46], [0, 1, 1, 0]);
  const s2Y = useTransform(scrollYProgress, [0.22, 0.28, 0.40, 0.46], [60, 0, 0, -60]);
  const s2Scale = useTransform(scrollYProgress, [0.22, 0.28, 0.40, 0.46], [0.97, 1, 1, 0.97]);

  // Section 3: Right Aligned (Scroll progress 48% to 74%)
  const s3Opacity = useTransform(scrollYProgress, [0.48, 0.54, 0.66, 0.74], [0, 1, 1, 0]);
  const s3Y = useTransform(scrollYProgress, [0.48, 0.54, 0.66, 0.74], [60, 0, 0, -60]);
  const s3Scale = useTransform(scrollYProgress, [0.48, 0.54, 0.66, 0.74], [0.97, 1, 1, 0.97]);

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-10">
      {/* Section 1: Introduction */}
      <motion.div
        style={{ opacity: s1Opacity, y: s1Y, scale: s1Scale }}
        className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
      >
        <div className="max-w-4xl flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="flex items-center gap-2 mb-4 bg-white/[0.03] border border-white/[0.08] px-4 py-1.5 rounded-full backdrop-blur-sm"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-[10px] tracking-[0.25em] font-medium text-white/60 uppercase">
              Available for Freelance & Contract
            </span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.8 }}
            className="text-5xl md:text-8xl font-light font-display tracking-tight text-white mb-6 text-glow leading-none"
          >
            ALEX RIVERA
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ duration: 1.5, delay: 1 }}
            className="text-sm md:text-lg tracking-[0.4em] uppercase text-white/80 font-light"
          >
            Creative Developer & Digital Designer
          </motion.p>
        </div>
      </motion.div>

      {/* Section 2: Narrative - Left Aligned */}
      <motion.div
        style={{ opacity: s2Opacity, y: s2Y, scale: s2Scale }}
        className="absolute inset-0 flex items-center justify-start px-8 md:px-24"
      >
        <div className="max-w-xl text-left bg-black/10 p-6 md:p-10 rounded-2xl border border-white/[0.02] backdrop-blur-[2px]">
          <span className="text-xs tracking-[0.3em] font-medium text-blue-400 uppercase mb-4 block">
            01 / PHILOSOPHY
          </span>
          <h2 className="text-3xl md:text-5xl font-light font-display tracking-tight text-white mb-6 leading-tight">
            I build interactive <br />
            <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">
              digital experiences.
            </span>
          </h2>
          <p className="text-sm md:text-base text-white/50 leading-relaxed font-light">
            Specializing in high-performance WebGL, custom Canvas rendering, and advanced motion design. Blending clean visual aesthetics with solid software engineering.
          </p>
        </div>
      </motion.div>

      {/* Section 3: Narrative - Right Aligned */}
      <motion.div
        style={{ opacity: s3Opacity, y: s3Y, scale: s3Scale }}
        className="absolute inset-0 flex items-center justify-end px-8 md:px-24"
      >
        <div className="max-w-xl text-left md:text-right bg-black/10 p-6 md:p-10 rounded-2xl border border-white/[0.02] backdrop-blur-[2px] flex flex-col md:items-end">
          <span className="text-xs tracking-[0.3em] font-medium text-purple-400 uppercase mb-4 block">
            02 / SYNERGY
          </span>
          <h2 className="text-3xl md:text-5xl font-light font-display tracking-tight text-white mb-6 leading-tight">
            Bridging design <br />
            <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
              and engineering.
            </span>
          </h2>
          <p className="text-sm md:text-base text-white/50 leading-relaxed font-light max-w-md">
            Writing performance-critical code that translates layouts into responsive, accessible systems. Creating digital work that interacts seamlessly with user movements.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
