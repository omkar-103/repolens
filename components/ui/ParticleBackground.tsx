"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

interface Orb {
  id: number;
  x: string;
  y: string;
  size: number;
  color: string;
  duration: number;
  delay: number;
}

export function ParticleBackground() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 50, stiffness: 100 };
  const mouseXSpring = useSpring(mouseX, springConfig);
  const mouseYSpring = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      mouseX.set((clientX / innerWidth - 0.5) * 100);
      mouseY.set((clientY / innerHeight - 0.5) * 100);
      setMousePosition({ x: clientX, y: clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const particles: Particle[] = useMemo(() => {
    return Array.from({ length: 80 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 20 + 15,
      delay: Math.random() * 10,
      opacity: Math.random() * 0.5 + 0.1,
    }));
  }, []);

  const orbs: Orb[] = useMemo(() => [
    { id: 1, x: "20%", y: "20%", size: 600, color: "rgba(168, 85, 247, 0.15)", duration: 25, delay: 0 },
    { id: 2, x: "80%", y: "30%", size: 500, color: "rgba(59, 130, 246, 0.12)", duration: 30, delay: 5 },
    { id: 3, x: "50%", y: "70%", size: 700, color: "rgba(6, 182, 212, 0.1)", duration: 35, delay: 10 },
    { id: 4, x: "10%", y: "80%", size: 400, color: "rgba(236, 72, 153, 0.08)", duration: 28, delay: 3 },
    { id: 5, x: "90%", y: "80%", size: 450, color: "rgba(168, 85, 247, 0.1)", duration: 32, delay: 7 },
  ], []);

  const orbX = useTransform(mouseXSpring, [-50, 50], [-30, 30]);
  const orbY = useTransform(mouseYSpring, [-50, 50], [-30, 30]);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-background" />
      
      {/* Mesh gradient overlay */}
      <div className="absolute inset-0 mesh-gradient opacity-70" />

      {/* Grid pattern */}
      <div className="absolute inset-0 grid-pattern opacity-30" />

      {/* Animated gradient orbs */}
      {orbs.map((orb) => (
        <motion.div
          key={orb.id}
          className="absolute rounded-full animate-pulse-glow"
          style={{
            left: orb.x,
            top: orb.y,
            width: orb.size,
            height: orb.size,
            background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
            x: orbX,
            y: orbY,
            transform: "translate(-50%, -50%)",
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            delay: orb.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Floating particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            background: `radial-gradient(circle, rgba(255,255,255,${particle.opacity}) 0%, transparent 70%)`,
          }}
          animate={{
            y: [-20, 20, -20],
            x: [-10, 10, -10],
            opacity: [particle.opacity * 0.5, particle.opacity, particle.opacity * 0.5],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Floating code snippets */}
      <FloatingCode 
        code="const analyze = async (repo) => {" 
        className="top-[15%] left-[5%]" 
        delay={0}
      />
      <FloatingCode 
        code="<RepoLens score={100} tier='Gold' />" 
        className="top-[25%] right-[8%]" 
        delay={2}
      />
      <FloatingCode 
        code="git commit -m 'feat: ✨ amazing'" 
        className="bottom-[30%] left-[8%]" 
        delay={4}
      />
      <FloatingCode 
        code="npm run build → Success!" 
        className="bottom-[20%] right-[5%]" 
        delay={6}
      />
      <FloatingCode 
        code="export default function App()" 
        className="top-[50%] left-[3%]" 
        delay={3}
      />
      <FloatingCode 
        code="// AI-powered analysis ✓" 
        className="top-[40%] right-[3%]" 
        delay={5}
      />

      {/* Mouse follow glow */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(168, 85, 247, 0.08) 0%, transparent 60%)",
          left: mousePosition.x - 300,
          top: mousePosition.y - 300,
        }}
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Noise texture overlay */}
      <div className="absolute inset-0 noise-overlay" />

      {/* Vignette effect */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, transparent 0%, rgba(3, 0, 20, 0.4) 100%)",
        }}
      />
    </div>
  );
}

function FloatingCode({ code, className, delay = 0 }: { code: string; className: string; delay?: number }) {
  return (
    <motion.div
      className={`absolute ${className} font-mono text-[10px] sm:text-xs text-white/[0.07] select-none whitespace-nowrap`}
      initial={{ opacity: 0 }}
      animate={{
        y: [0, -15, 0],
        opacity: [0.04, 0.08, 0.04],
        rotateZ: [-1, 1, -1],
      }}
      transition={{
        duration: 12,
        repeat: Infinity,
        delay,
        ease: "easeInOut",
      }}
    >
      {code}
    </motion.div>
  );
}