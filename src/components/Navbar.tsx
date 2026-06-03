"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function Navbar() {
  return (
    <motion.header
      initial={{ y: -50, x: "-50%", opacity: 0 }}
      animate={{ y: 0, x: "-50%", opacity: 1 }}
      transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
      className="fixed top-6 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-5xl z-40"
    >
      <div className="glass rounded-full px-6 py-3.5 flex items-center justify-between shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)] border border-white/[0.04]">
        
        {/* Logo */}
        <a href="#" className="flex items-center gap-1.5 group select-none">
          <span className="font-display font-semibold text-lg tracking-wider text-white group-hover:text-blue-400 transition-colors duration-300">
            RIVERA
          </span>
          <span className="w-1 h-1 rounded-full bg-blue-500 group-hover:bg-blue-400 transition-colors duration-300" />
        </a>

        {/* Links */}
        <nav className="hidden md:flex items-center gap-8">
          <a
            href="#work"
            className="text-xs tracking-[0.2em] font-medium text-white/50 hover:text-white uppercase transition-colors duration-300"
          >
            Work
          </a>
          <a
            href="#about"
            className="text-xs tracking-[0.2em] font-medium text-white/50 hover:text-white uppercase transition-colors duration-300"
          >
            About
          </a>
          <a
            href="#services"
            className="text-xs tracking-[0.2em] font-medium text-white/50 hover:text-white uppercase transition-colors duration-300"
          >
            Services
          </a>
        </nav>

        {/* CTA */}
        <div>
          <a
            href="#contact"
            className="flex items-center gap-2 bg-white/[0.04] border border-white/[0.08] hover:bg-white hover:text-black hover:border-transparent transition-all duration-300 text-xs tracking-widest font-semibold uppercase text-white/80 px-4 py-2 rounded-full group"
          >
            Connect
            <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform duration-300" />
          </a>
        </div>

      </div>
    </motion.header>
  );
}
