"use client";
import { useScroll, useMotionValueEvent, useTransform, motion, AnimatePresence, MotionValue } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";

// ═══════════════════════════════════════
// SCROLLY CANVAS
// ═══════════════════════════════════════
function ScrollyCanvas({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const preloadedImages = useRef<HTMLImageElement[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const totalFrames = 150;
  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, totalFrames - 1]);

  useEffect(() => {
    let loaded = 0;
    const images: HTMLImageElement[] = [];
    for (let i = 0; i < totalFrames; i++) {
      const img = new Image();
      img.src = `/sequence/frame_${String(i).padStart(3, "0")}_delay-0.066s.png`;
      img.onload = () => { loaded++; setImagesLoaded(loaded); if (loaded === totalFrames) setIsReady(true); };
      img.onerror = () => { loaded++; setImagesLoaded(loaded); if (loaded === totalFrames) setIsReady(true); };
      images.push(img);
    }
    preloadedImages.current = images;
  }, []);

  const drawFrame = (index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const img = preloadedImages.current[index];
    if (!img || !img.complete) return;
    const cw = canvas.width, ch = canvas.height;
    const iw = img.naturalWidth || img.width, ih = img.naturalHeight || img.height;
    const ir = iw / ih, cr = cw / ch;
    let dw = cw, dh = ch, ox = 0, oy = 0;
    if (ir > cr) { dw = ch * ir; ox = (cw - dw) / 2; }
    else { dh = cw / ir; oy = (ch - dh) / 2; }
    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, ox, oy, dw, dh);
  };

  useMotionValueEvent(frameIndex, "change", (latest) => drawFrame(Math.round(latest)));

  useEffect(() => {
    if (!isReady) return;
    const resize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      drawFrame(Math.round(frameIndex.get()));
    };
    window.addEventListener("resize", resize);
    resize();
    setTimeout(resize, 100);
    return () => window.removeEventListener("resize", resize);
  }, [isReady]);

  const loadPercent = Math.round((imagesLoaded / totalFrames) * 100);

  return (
    <>
      <AnimatePresence>
        {!isReady && (
          <motion.div initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.8 }} className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#030303]">
            <div className="flex flex-col items-center">
              <div className="w-40 h-40 rounded-full bg-blue-500/10 blur-xl animate-pulse absolute" />
              <h2 className="text-2xl font-semibold tracking-widest uppercase font-display text-glow mb-8 relative z-10">LA CASA DE PAPEL</h2>
              <div className="text-4xl font-light font-display text-white/90 mb-4 relative z-10">{loadPercent}%</div>
              <div className="w-64 h-[1px] bg-white/10 overflow-hidden relative z-10">
                <div className="h-full bg-white transition-all duration-300" style={{ width: `${loadPercent}%` }} />
              </div>
              <p className="mt-4 text-xs tracking-wider uppercase text-white/40 relative z-10">Loading Sequence...</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden z-0 bg-[#030303]">
        <canvas ref={canvasRef} className="w-full h-full object-cover pointer-events-none" style={{ width: "100vw", height: "100vh" }} />
        {isReady && <Overlay scrollYProgress={scrollYProgress} />}
      </div>
    </>
  );
}

// ═══════════════════════════════════════
// OVERLAY – ALL 6 SLIDES (CRYSTAL CLEAR)
// ═══════════════════════════════════════
function Overlay({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  const s1Opacity = useTransform(scrollYProgress, [0, 0.08, 0.14], [1, 1, 0]);
  const s1Y = useTransform(scrollYProgress, [0, 0.14], [0, -50]);

  const s2Opacity = useTransform(scrollYProgress, [0.12, 0.18, 0.26, 0.30], [0, 1, 1, 0]);
  const s2Y = useTransform(scrollYProgress, [0.12, 0.18, 0.26, 0.30], [40, 0, 0, -40]);

  const s3Opacity = useTransform(scrollYProgress, [0.28, 0.34, 0.42, 0.46], [0, 1, 1, 0]);
  const s3Y = useTransform(scrollYProgress, [0.28, 0.34, 0.42, 0.46], [40, 0, 0, -40]);

  const s4Opacity = useTransform(scrollYProgress, [0.44, 0.50, 0.58, 0.62], [0, 1, 1, 0]);
  const s4Y = useTransform(scrollYProgress, [0.44, 0.50, 0.58, 0.62], [40, 0, 0, -40]);

  const s5Opacity = useTransform(scrollYProgress, [0.60, 0.66, 0.74, 0.78], [0, 1, 1, 0]);
  const s5Y = useTransform(scrollYProgress, [0.60, 0.66, 0.74, 0.78], [40, 0, 0, -40]);

  const s6Opacity = useTransform(scrollYProgress, [0.70, 0.76, 0.90, 1.0], [0, 1, 1, 1]);
  const s6Y = useTransform(scrollYProgress, [0.70, 0.76, 0.90, 1.0], [20, 0, 0, 0]);

  const moneyHeistBg = useTransform(scrollYProgress, [0.26, 0.34], ["rgba(3,3,3,0)", "rgba(10,7,7,1)"]);
  const maskOpacity = useTransform(scrollYProgress, [0.26, 0.34], [0, 0.12]);
  const marqueeOpacity = useTransform(scrollYProgress, [0.26, 0.34], [0, 1]);

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-10">
      <motion.div style={{ backgroundColor: moneyHeistBg }} className="absolute inset-0" />

      {/* Floating Masks */}
      <motion.div style={{ opacity: maskOpacity }} className="absolute inset-0 overflow-hidden">
        <span className="floating-mask" style={{ left: '5%', animationDuration: '16s', animationDelay: '0s', fontSize: '2rem' }}>🎭</span>
        <span className="floating-mask" style={{ left: '15%', animationDuration: '18s', animationDelay: '1s', fontSize: '2.5rem' }}>💀</span>
        <span className="floating-mask" style={{ left: '25%', animationDuration: '14s', animationDelay: '2s', fontSize: '1.8rem' }}>🎭</span>
        <span className="floating-mask" style={{ left: '35%', animationDuration: '20s', animationDelay: '0.5s', fontSize: '3rem' }}>🖤</span>
        <span className="floating-mask" style={{ left: '45%', animationDuration: '15s', animationDelay: '3s', fontSize: '2.2rem' }}>🎭</span>
        <span className="floating-mask" style={{ left: '55%', animationDuration: '17s', animationDelay: '1.5s', fontSize: '2.8rem' }}>💀</span>
        <span className="floating-mask" style={{ left: '65%', animationDuration: '19s', animationDelay: '4s', fontSize: '1.6rem' }}>🎭</span>
        <span className="floating-mask" style={{ left: '75%', animationDuration: '13s', animationDelay: '2.5s', fontSize: '2.4rem' }}>🖤</span>
        <span className="floating-mask" style={{ left: '85%', animationDuration: '21s', animationDelay: '0.8s', fontSize: '3.2rem' }}>🎭</span>
        <span className="floating-mask" style={{ left: '92%', animationDuration: '16s', animationDelay: '3.5s', fontSize: '1.9rem' }}>💀</span>
      </motion.div>

      {/* Marquee */}
      <motion.div style={{ opacity: marqueeOpacity }} className="absolute top-0 left-0 w-full bg-black/90 py-2 border-b border-red-800/50 overflow-hidden whitespace-nowrap z-20">
        <div className="animate-marquee text-[#ffb347] font-display tracking-[3px] text-xs">
          🎭 THE PROFESSOR • BERLIN • NAIROBI • TOKYO • DENVER • RESISTANCE 🎭 &nbsp;&nbsp; 🎭 THE PROFESSOR • BERLIN • NAIROBI • TOKYO • DENVER • RESISTANCE 🎭
        </div>
      </motion.div>

      {/* SLIDE 1: HERO */}
      <motion.div id="hero" style={{ opacity: s1Opacity, y: s1Y }} className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
        <div className="flex items-center gap-2 mb-4 bg-white/[0.08] border border-white/[0.15] px-4 py-1.5 rounded-full backdrop-blur-md">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
          <span className="text-[10px] tracking-[0.25em] font-medium text-white/90 uppercase">Available for Opportunities</span>
        </div>
        <h1 className="text-5xl md:text-8xl font-light font-display tracking-tight text-white mb-6 text-glow leading-none drop-shadow-2xl">NALAMOTHU<br/>JASWANTH</h1>
        <p className="text-sm md:text-lg tracking-[0.4em] uppercase text-white/90 font-light drop-shadow-lg">IT Undergraduate &bull; Full-Stack Developer</p>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-[10px] tracking-[0.3em] uppercase text-white/60">Scroll to explore</span>
          <div className="w-[1px] h-8 bg-white/20 overflow-hidden">
            <motion.div className="w-full h-1/2 bg-white/80" animate={{ y: ["-100%", "200%"] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} />
          </div>
        </div>
      </motion.div>

      {/* SLIDE 2: ABOUT */}
      <motion.div id="about" style={{ opacity: s2Opacity, y: s2Y }} className="absolute inset-0 flex items-center justify-start px-6 md:px-20">
        <div className="max-w-2xl bg-black/40 backdrop-blur-md p-8 md:p-10 rounded-2xl border border-white/[0.1] shadow-2xl">
          <span className="text-xs tracking-[0.3em] text-blue-400 uppercase mb-4 block font-semibold">01 / About Me</span>
          <h2 className="text-3xl md:text-5xl font-light font-display text-white mb-6 leading-tight drop-shadow-md">Hyderabad-based <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">IT student.</span></h2>
          <p className="text-sm md:text-base text-white/90 leading-relaxed mb-4 drop-shadow-md">Graduating in 2026 with a Bachelor&apos;s in Information Technology. Passionate about building intelligent systems, 3D experiences, and scalable web applications.</p>
          <div className="border-t border-white/[0.15] pt-4 mt-4">
            <span className="text-xs tracking-[0.2em] text-white/80 uppercase mb-3 block">Education</span>
            <div className="space-y-3">
              <div className="flex items-start gap-3"><span className="text-lg">🎓</span><div><p className="text-white/95 text-sm font-semibold">Malla Reddy College</p><p className="text-white/80 text-xs">B.Tech in Information Technology &bull; 2022 – 2026</p><p className="text-blue-400 text-xs font-semibold mt-0.5">CGPA: 8.78</p></div></div>
              <div className="flex items-start gap-3"><span className="text-lg">📍</span><div><p className="text-white/95 text-sm font-semibold">Hyderabad, Telangana</p><p className="text-white/80 text-xs">India</p></div></div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* SLIDE 3: SKILLS */}
      <motion.div id="skills" style={{ opacity: s3Opacity, y: s3Y }} className="absolute inset-0 flex items-center justify-end px-6 md:px-20">
        <div className="max-w-2xl bg-black/50 backdrop-blur-md p-8 md:p-10 rounded-2xl border border-red-800/50 shadow-[0_0_50px_rgba(196,30,58,0.3)]">
          <span className="text-xs tracking-[0.3em] text-[#ffb347] uppercase mb-4 block font-semibold">🎭 The Arsenal</span>
          <h2 className="text-3xl md:text-5xl font-light font-display text-white mb-6 leading-tight drop-shadow-md">Tools for the <span className="font-semibold text-[#c41e3a]">perfect heist.</span></h2>
          <div className="grid grid-cols-2 gap-3">
            {[{ icon: '💻', name: 'Full-Stack', desc: 'React, Node.js, MongoDB' },{ icon: '🐍', name: 'Python', desc: 'Pandas, Flask, NLTK' },{ icon: '🌐', name: 'CCNA', desc: 'Routing, Switching, WAN' },{ icon: '☁️', name: 'Cloud', desc: 'AWS, Docker, CI/CD' },{ icon: '🐧', name: 'Linux', desc: 'Ubuntu, Bash, Admin' },{ icon: '🗄️', name: 'SQL', desc: 'MySQL, PostgreSQL' }].map((skill, i) => (
              <div key={i} className="text-left bg-white/[0.05] border border-red-800/30 px-4 py-3 rounded-xl hover:border-red-800/60 transition-colors">
                <span className="text-lg">{skill.icon}</span>
                <p className="text-white/95 text-xs font-semibold mt-1">{skill.name}</p>
                <p className="text-white/85 text-[10px]">{skill.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* SLIDE 4: INTERNSHIP */}
      <motion.div id="internship" style={{ opacity: s4Opacity, y: s4Y }} className="absolute inset-0 flex items-center justify-start px-6 md:px-20">
        <div className="max-w-2xl bg-black/50 backdrop-blur-md p-8 md:p-10 rounded-2xl border border-red-800/50 shadow-[0_0_50px_rgba(196,30,58,0.3)]">
          <span className="text-xs tracking-[0.3em] text-[#ffb347] uppercase mb-4 block font-semibold">🎭 Previous Heists</span>
          <h2 className="text-3xl md:text-5xl font-light font-display text-white mb-6 leading-tight drop-shadow-md">Field <span className="font-semibold text-[#c41e3a]">experience.</span></h2>
          <div className="space-y-5">
            <div className="border-l-2 border-red-800/50 pl-4">
              <p className="text-[#ffb347] text-xs tracking-wider font-semibold">2026 – Present</p>
              <h3 className="text-white text-base font-display mt-1">Software Engineer Intern</h3>
              <p className="text-[#c41e3a] text-xs font-semibold">Eidiko System Integrator</p>
              <p className="text-white/85 text-xs mt-1 leading-relaxed">✅ Completed Linux system administration training<br/>🔄 Currently learning SQL for data analytics<br/>🔹 Technical support & internal automation tools</p>
            </div>
            <div className="border-l-2 border-red-800/50 pl-4">
              <p className="text-[#ffb347] text-xs tracking-wider font-semibold">2026</p>
              <h3 className="text-white text-base font-display mt-1">Web Development Intern</h3>
              <p className="text-[#c41e3a] text-xs font-semibold">Cognifyz Technologies</p>
              <p className="text-white/85 text-xs mt-1 leading-relaxed">🔹 React & Bootstrap front-end development<br/>🔹 Agile team collaboration & Git version control<br/>🔹 REST API integration & debugging</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* SLIDE 5: PROJECTS */}
      <motion.div id="projects" style={{ opacity: s5Opacity, y: s5Y }} className="absolute inset-0 flex items-center justify-end px-6 md:px-20">
        <div className="max-w-2xl bg-black/50 backdrop-blur-md p-8 md:p-10 rounded-2xl border border-red-800/50 shadow-[0_0_50px_rgba(196,30,58,0.3)]">
          <span className="text-xs tracking-[0.3em] text-[#ffb347] uppercase mb-4 block font-semibold">🎭 The Vault</span>
          <h2 className="text-3xl md:text-5xl font-light font-display text-white mb-6 leading-tight drop-shadow-md">Featured <span className="font-semibold text-[#c41e3a]">operations.</span></h2>
          <div className="space-y-4">
            {[{ title: '📈 Stock Prediction + NLP', desc: 'Flask web app using sentiment analysis on financial news.', tags: ['Python','Flask','NLTK'] },{ title: '🔗 Blockchain Secure Sharing', desc: 'Decentralized file sharing platform with cryptographic hashing.', tags: ['Python','Flask','Hashlib'] },{ title: '⚙️ Enterprise Simulation', desc: 'Kafka-based messaging, REST APIs, and H2 database integration.', tags: ['Kafka','REST','H2'] }].map((proj, i) => (
              <div key={i} className="bg-white/[0.03] border border-red-800/30 p-4 rounded-xl hover:border-red-800/60 transition-colors">
                <h3 className="text-white text-sm font-display mb-1">{proj.title}</h3>
                <p className="text-white/85 text-xs mb-2 leading-relaxed">{proj.desc}</p>
                <div className="flex flex-wrap gap-1.5">{proj.tags.map((tag, j) => (<span key={j} className="text-[10px] text-[#ffb347] bg-red-800/10 border border-red-800/20 px-2 py-0.5 rounded-full">{tag}</span>))}</div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* SLIDE 6: CONTACT */}
      <motion.div id="contact" style={{ opacity: s6Opacity, y: s6Y }} className="absolute inset-0 flex items-center justify-center px-6 md:px-20">
        <div className="max-w-lg w-full bg-black/60 backdrop-blur-md p-8 md:p-10 rounded-2xl border-2 border-red-800/60 shadow-[0_0_80px_rgba(196,30,58,0.4)] pointer-events-auto">
          <span className="text-xs tracking-[0.3em] text-[#ffb347] uppercase mb-4 block font-semibold text-center">🎭 Join The Crew</span>
          <h2 className="text-3xl md:text-4xl font-light font-display text-white mb-2 text-center leading-tight drop-shadow-md">Send a <span className="font-semibold text-[#c41e3a]">signal.</span></h2>
          <p className="text-white/80 text-xs text-center mb-6">The Professor is recruiting. Drop a message — but be careful, the police might be watching. 👮</p>
          <form action="https://formspree.io/f/xkoawpkv" method="POST" className="space-y-4">
            <input type="text" name="name" placeholder="Your Codename" required className="w-full bg-black/50 border border-red-800/40 text-white placeholder-white/60 px-4 py-3.5 rounded-xl text-sm focus:outline-none focus:border-red-500/80 transition-colors" />
            <input type="email" name="email" placeholder="Your Secure Channel (Email)" required className="w-full bg-black/50 border border-red-800/40 text-white placeholder-white/60 px-4 py-3.5 rounded-xl text-sm focus:outline-none focus:border-red-500/80 transition-colors" />
            <textarea name="message" rows={4} placeholder="Your Message..." required className="w-full bg-black/50 border border-red-800/40 text-white placeholder-white/60 px-4 py-3.5 rounded-xl text-sm focus:outline-none focus:border-red-500/80 transition-colors resize-none" />
            <button type="submit" className="w-full bg-[#c41e3a] hover:bg-[#a01830] text-white font-display tracking-wider text-sm py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2 font-semibold">SEND SIGNAL 🔴 <ArrowRight className="w-4 h-4" /></button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}

// ═══════════════════════════════════════
// NAVBAR
// ═══════════════════════════════════════
function Navbar() {
  const scrollTo = (id: string) => {
    const m: Record<string, number> = { hero: 0, about: 0.14, skills: 0.30, internship: 0.47, projects: 0.63, contact: 0.73 };
    const t = (document.documentElement.scrollHeight - window.innerHeight) * (m[id] || 0);
    window.scrollTo({ top: t, behavior: "smooth" });
  };
  return (
    <motion.header initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1, delay: 0.2 }} className="fixed top-6 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-5xl z-40">
      <div className="glass rounded-full px-6 py-3.5 flex items-center justify-between">
        <button onClick={() => scrollTo('hero')} className="font-display font-semibold text-lg tracking-wider text-white hover:text-blue-400 transition-colors">JASWANTH<span className="w-1 h-1 rounded-full bg-blue-500 inline-block ml-1" /></button>
        <nav className="hidden md:flex items-center gap-6">
          <button onClick={() => scrollTo('about')} className="text-xs tracking-[0.2em] text-white/70 hover:text-white uppercase transition-colors">About</button>
          <button onClick={() => scrollTo('skills')} className="text-xs tracking-[0.2em] text-white/70 hover:text-white uppercase transition-colors">Skills</button>
          <button onClick={() => scrollTo('internship')} className="text-xs tracking-[0.2em] text-white/70 hover:text-white uppercase transition-colors">Experience</button>
          <button onClick={() => scrollTo('projects')} className="text-xs tracking-[0.2em] text-white/70 hover:text-white uppercase transition-colors">Projects</button>
        </nav>
        <button onClick={() => scrollTo('contact')} className="flex items-center gap-2 bg-white/[0.04] hover:bg-white hover:text-black transition-all text-xs tracking-widest uppercase text-white/80 px-4 py-2 rounded-full">Contact <ArrowRight className="w-3 h-3" /></button>
      </div>
    </motion.header>
  );
}

// ═══════════════════════════════════════
// PROJECTS SECTION BELOW CANVAS
// ═══════════════════════════════════════
function ProjectsSection() {
  const p = [
    { title: "Stock Prediction + NLP", cat: "AI & Data Science", tags: ["Python", "Flask", "NLTK", "Pandas"] },
    { title: "Blockchain Secure Sharing", cat: "Cybersecurity", tags: ["Python", "Blockchain", "Hashlib", "Flask"] },
    { title: "Enterprise Simulation", cat: "Backend Systems", tags: ["Kafka", "REST APIs", "H2", "Java"] },
  ];
  return (
    <section className="relative z-10 w-full min-h-screen bg-[#0a0707] px-6 md:px-24 py-32 border-t border-red-800/30">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <span className="text-xs tracking-[0.3em] text-[#ffb347] uppercase font-semibold">🎭 Detailed Case Files</span>
          <h2 className="text-4xl md:text-6xl font-light font-display text-white mt-3 mb-4 drop-shadow-md">ALL <span className="text-[#c41e3a] font-semibold">OPERATIONS</span></h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {p.map((x, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }} className="group">
              <div className="glass rounded-2xl p-8 border border-red-800/30 hover:border-red-800/60 transition-all">
                <span className="text-[10px] tracking-[0.25em] text-[#ffb347]/80 uppercase font-medium">{x.cat}</span>
                <h3 className="text-xl font-light font-display text-white mt-3 mb-4 group-hover:text-[#ffb347] transition-colors">{x.title}</h3>
                <div className="flex flex-wrap gap-2">{x.tags.map((t, j) => (<span key={j} className="text-[10px] text-white/80 bg-white/[0.04] border border-red-800/30 px-2.5 py-1 rounded-md">{t}</span>))}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  return (
    <main ref={containerRef} className="relative bg-[#030303] min-h-screen">
      <Navbar />
      <div className="relative w-full h-[600vh]">
        <ScrollyCanvas scrollYProgress={scrollYProgress} />
      </div>
      <ProjectsSection />
      <footer className="relative z-10 w-full bg-[#0a0707] text-white/30 border-t border-red-800/20 py-12 px-6 text-center">
        <p className="text-xs tracking-wider">© 2026 Nalamothu Jaswanth — La Resistencia 🎭</p>
      </footer>
    </main>
  );
}
