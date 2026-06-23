"use client";
import { useMounted } from "@/hooks/use-mounted";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

type Particle = { 
  id: number; 
  top: string; 
  left: string; 
  size: number; 
  duration: number; 
  delay: number;
  drift: number; 
};

export const ParticleBg = () => {
  const mounted = useMounted();
  const [particles, setParticles] = useState<Particle[]>([]);
  const seededRef = useRef(false);

  useEffect(() => {
    if (!mounted || seededRef.current) return;
    seededRef.current = true;
    
    // Generating particles with added movement metadata
    setParticles(
      Array.from({ length: 30 }, (_, i) => ({
        id: i,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        size: Math.random() * 1 + 2,
        duration: 15 + Math.random() * 20, // Float speed
        delay: Math.random() * -20, // Negative delay so they start at different positions
        drift: 10 + Math.random() * 20, // Horizontal wobble distance
      })),
    );
  }, [mounted]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-[#D9D9D980]"
          style={{
            top: p.top,
            left: p.left,
            width: `${p.size}px`,
            height: `${p.size}px`,
          }}
          // Adding the high-performance animation loop
          animate={{
            // Upward floating motion
            y: [0, -600], 
            // Horizontal "Wobble" using a sine-wave pattern
            x: [0, p.drift, 0, -p.drift, 0],
            // Fading in and out like bubbles
            opacity: [0, 0.4, 0.6, 0.4, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "linear",
            delay: p.delay,
          }}
        />
      ))}
    </div>
  );
};