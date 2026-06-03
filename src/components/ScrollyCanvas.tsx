"use client";

import { useScroll, useMotionValueEvent, useTransform, AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Overlay from "./Overlay";

interface ScrollyCanvasProps {
  children?: React.ReactNode;
}

export default function ScrollyCanvas({ children }: ScrollyCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const preloadedImages = useRef<HTMLImageElement[]>([]);
  
  const [imagesLoaded, setImagesLoaded] = useState<number>(0);
  const [isReady, setIsReady] = useState<boolean>(false);
  const totalFrames = 150;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Map scroll progress (0 to 1) to the sequence frame index (0 to 149)
  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, totalFrames - 1]);

  // Load image sequence
  useEffect(() => {
    let loadedCount = 0;
    const loadedImages: HTMLImageElement[] = [];

    for (let i = 0; i < totalFrames; i++) {
      const img = new Image();
      const paddedIndex = String(i).padStart(3, "0");
      img.src = `/sequence/frame_${paddedIndex}_delay-0.066s.png`;

      img.onload = () => {
        loadedCount++;
        setImagesLoaded(loadedCount);
        if (loadedCount === totalFrames) {
          setIsReady(true);
        }
      };

      img.onerror = () => {
        console.warn(`Failed to load frame ${i}`);
        loadedCount++;
        setImagesLoaded(loadedCount);
        if (loadedCount === totalFrames) {
          setIsReady(true);
        }
      };

      loadedImages.push(img);
    }

    preloadedImages.current = loadedImages;
  }, []);

  const drawFrame = (index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = preloadedImages.current[index];
    if (!img || !img.complete) return;

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const imageWidth = img.naturalWidth || img.width;
    const imageHeight = img.naturalHeight || img.height;

    const imgRatio = imageWidth / imageHeight;
    const canvasRatio = canvasWidth / canvasHeight;

    let drawWidth = canvasWidth;
    let drawHeight = canvasHeight;
    let offsetX = 0;
    let offsetY = 0;

    // Canvas object-fit: cover drawing calculations
    if (imgRatio > canvasRatio) {
      drawWidth = canvasHeight * imgRatio;
      offsetX = (canvasWidth - drawWidth) / 2;
    } else {
      drawHeight = canvasWidth / imgRatio;
      offsetY = (canvasHeight - drawHeight) / 2;
    }

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  };

  // Listen to frame index changes and draw frame
  useMotionValueEvent(frameIndex, "change", (latest) => {
    const index = Math.round(latest);
    drawFrame(index);
  });

  // Handle resizing of canvas
  useEffect(() => {
    if (!isReady) return;

    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;

      // Immediately draw current frame on resize
      const currentIndex = Math.round(frameIndex.get());
      drawFrame(currentIndex);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    // Small delay to ensure correct initialization after DOM rendering
    const initTimeout = setTimeout(handleResize, 100);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(initTimeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isReady]);

  const loadPercent = Math.round((imagesLoaded / totalFrames) * 100);

  return (
    <div ref={containerRef} className="relative w-full h-[500vh]">
      {/* Loading Screen Overlay */}
      <AnimatePresence>
        {!isReady && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#030303] text-white"
          >
            <div className="relative flex flex-col items-center max-w-xs w-full px-6">
              {/* Spinner/Glow */}
              <div className="absolute w-40 h-40 rounded-full bg-blue-500/10 blur-xl animate-pulse" />
              
              {/* Logo / Brand */}
              <motion.h2 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-2xl font-semibold tracking-widest uppercase font-display text-glow mb-8"
              >
                Creative Portfolio
              </motion.h2>

              {/* Progress percentage */}
              <div className="text-4xl font-light font-display tracking-tight text-white/90 mb-4">
                {loadPercent}%
              </div>

              {/* Progress bar */}
              <div className="relative w-full h-[1px] bg-white/10 overflow-hidden">
                <motion.div
                  className="absolute left-0 top-0 h-full bg-white"
                  style={{ width: `${loadPercent}%` }}
                  transition={{ ease: "easeOut" }}
                />
              </div>

              {/* Message */}
              <div className="mt-4 text-xs tracking-wider uppercase text-white/40">
                Loading Cinematic Sequence...
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sticky Canvas Wrapper */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden z-0 bg-[#030303]">
        <canvas
          ref={canvasRef}
          className="w-full h-full block object-cover pointer-events-none"
          style={{ width: "100vw", height: "100vh" }}
        />

        {/* Content Overlays inside Sticky Container */}
        {isReady && <Overlay scrollYProgress={scrollYProgress} />}
        {isReady && children}

        {/* Bottom scroll hint indicator */}
        {isReady && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ delay: 1 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none z-20"
          >
            <span className="text-[10px] tracking-[0.3em] uppercase text-white/40">
              Scroll to explore
            </span>
            <div className="w-[1px] h-10 bg-white/20 relative overflow-hidden">
              <motion.div 
                className="absolute top-0 left-0 w-full h-1/2 bg-white"
                animate={{ 
                  y: ["-100%", "200%"],
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
              />
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
