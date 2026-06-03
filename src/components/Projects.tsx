"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

interface Project {
  title: string;
  category: string;
  tags: string[];
  image: string;
  color: string; // for border/glow accent
}

const projects: Project[] = [
  {
    title: "NEXUS INTERACTIVE",
    category: "E-COMMERCE PLATFORM",
    tags: ["Next.js", "WebGL", "Tailwind", "Three.js"],
    image: "/projects/nexus.png",
    color: "group-hover:shadow-[0_0_50px_rgba(59,130,246,0.15)]",
  },
  {
    title: "AETHER DESIGN SYSTEM",
    category: "CREATIVE FRAMEWORK",
    tags: ["TypeScript", "CSS-in-JS", "Framer Motion"],
    image: "/projects/aether.png",
    color: "group-hover:shadow-[0_0_50px_rgba(20,184,166,0.15)]",
  },
  {
    title: "VORTEX ANALYTICS",
    category: "REAL-TIME DASHBOARD",
    tags: ["React", "D3.js", "WebSockets", "Node.js"],
    image: "/projects/vortex.png",
    color: "group-hover:shadow-[0_0_50px_rgba(168,85,247,0.15)]",
  },
];

export default function Projects() {
  return (
    <section id="work" className="relative z-10 w-full min-h-screen bg-[#030303] px-6 md:px-24 py-32 border-t border-white/[0.04]">
      {/* Background glow effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-blue-500/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-purple-500/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2 mb-3"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
            <span className="text-[10px] tracking-[0.3em] font-medium text-white/50 uppercase">
              Selected Work
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl md:text-6xl font-light font-display tracking-tight text-white mb-4"
          >
            CASE STUDIES
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-sm md:text-base text-white/70 max-w-md font-light leading-relaxed"
          >
            A curated list of digital projects built with high-performance animations, fluid scroll triggers, and robust architecture.
          </motion.p>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {projects.map((project, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: idx * 0.15 }}
              className="group"
            >
              <div className={`relative overflow-hidden rounded-2xl glass transition-all duration-500 ${project.color} flex flex-col h-full`}>
                
                {/* Radial Glow on Hover */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/[0.01] to-white/[0.00] pointer-events-none" />
                
                {/* Image Container */}
                <div className="relative aspect-[16/10] overflow-hidden border-b border-white/[0.04]">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover object-center group-hover:scale-[1.04] transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500" />
                </div>

                {/* Content */}
                <div className="p-8 flex flex-col flex-grow">
                  <span className="text-[10px] tracking-[0.25em] text-white/40 font-medium mb-2 block font-display">
                    {project.category}
                  </span>
                  
                  <h3 className="text-xl md:text-2xl font-light font-display text-white mb-6 group-hover:text-blue-400 transition-colors duration-300">
                    {project.title}
                  </h3>
                  
                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-2 mb-8 mt-auto">
                    {project.tags.map((tag, tagIdx) => (
                      <span
                        key={tagIdx}
                        className="text-[10px] tracking-wider text-white/50 bg-white/[0.03] border border-white/[0.06] px-2.5 py-1 rounded-md"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Interactive Trigger link */}
                  <div className="flex items-center gap-2 text-xs tracking-[0.2em] font-medium text-white/70 uppercase group-hover:text-white transition-colors duration-300 pt-4 border-t border-white/[0.03]">
                    Explore Project
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300 text-white/40 group-hover:text-blue-400" />
                  </div>
                </div>

              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
