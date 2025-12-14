"use client";

import { motion, useSpring, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import { getTierColor } from "@/lib/utils";

interface ProgressRingProps {
  progress: number;
  size?: number;
  strokeWidth?: number;
  tier?: "Bronze" | "Silver" | "Gold";
}

export function ProgressRing({
  progress,
  size = 220,
  strokeWidth = 14,
  tier = "Bronze",
}: ProgressRingProps) {
  const [mounted, setMounted] = useState(false);
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;

  const springProgress = useSpring(0, { stiffness: 30, damping: 20 });
  const strokeDashoffset = useTransform(
    springProgress,
    [0, 100],
    [circumference, 0]
  );

  const displayNumber = useTransform(springProgress, (latest) =>
    Math.round(latest)
  );

  useEffect(() => {
    setMounted(true);
    springProgress.set(progress);
  }, [progress, springProgress]);

  const gradientId = `progress-gradient-${tier}-${Math.random()}`;
  const glowId = `progress-glow-${tier}-${Math.random()}`;
  const bgGradientId = `bg-gradient-${tier}-${Math.random()}`;

  const tierColors = {
    Gold: { start: "#fbbf24", mid: "#f59e0b", end: "#d97706" },
    Silver: { start: "#e5e7eb", mid: "#9ca3af", end: "#6b7280" },
    Bronze: { start: "#fb923c", mid: "#ea580c", end: "#c2410c" },
  };

  const colors = tierColors[tier];

  return (
    <div className="relative" style={{ width: size, height: size }}>
      {/* Outer glow ring */}
      <motion.div
        className="absolute inset-[-20px] rounded-full"
        style={{
          background: `radial-gradient(circle, ${tier === "Gold" ? "rgba(251, 191, 36, 0.2)" : tier === "Silver" ? "rgba(156, 163, 175, 0.2)" : "rgba(251, 146, 60, 0.2)"} 0%, transparent 70%)`,
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Rotating accent ring */}
      <motion.div
        className="absolute inset-[-4px]"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <svg width={size + 8} height={size + 8} className="absolute inset-0">
          <defs>
            <linearGradient id={bgGradientId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={colors.start} stopOpacity="0.3" />
              <stop offset="50%" stopColor={colors.mid} stopOpacity="0.1" />
              <stop offset="100%" stopColor={colors.end} stopOpacity="0.3" />
            </linearGradient>
          </defs>
          <circle
            cx={(size + 8) / 2}
            cy={(size + 8) / 2}
            r={radius + 4}
            fill="none"
            stroke={`url(#${bgGradientId})`}
            strokeWidth="1"
            strokeDasharray="8 12"
          />
        </svg>
      </motion.div>

      <svg width={size} height={size} className="transform -rotate-90">
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={colors.start} />
            <stop offset="50%" stopColor={colors.mid} />
            <stop offset="100%" stopColor={colors.end} />
          </linearGradient>
          <filter id={glowId} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.05)"
          strokeWidth={strokeWidth}
        />

        {/* Track circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth={strokeWidth - 6}
        />

        {/* Progress circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          style={{ strokeDashoffset }}
          filter={`url(#${glowId})`}
        />
      </svg>

      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {/* Score number */}
        <motion.div
          className="relative"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.5 }}
        >
          <motion.span 
            className="text-6xl font-bold text-white font-display tracking-tight"
            style={{ textShadow: `0 0 40px ${colors.mid}` }}
          >
            {mounted && displayNumber}
          </motion.span>
        </motion.div>
        
        {/* Divider line */}
        <motion.div 
          className="w-16 h-[2px] my-2 rounded-full"
          style={{ background: `linear-gradient(90deg, transparent, ${colors.mid}, transparent)` }}
          initial={{ width: 0 }}
          animate={{ width: 64 }}
          transition={{ delay: 0.8 }}
        />
        
        <span className="text-white/40 text-sm font-medium tracking-wider uppercase">
          out of 100
        </span>
      </div>

      {/* Orbiting particles */}
      {mounted && [0, 1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full"
          style={{
            background: colors.mid,
            boxShadow: `0 0 10px ${colors.mid}`,
            top: "50%",
            left: "50%",
          }}
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            ease: "linear",
            delay: i * 0.5,
          }}
        >
          <motion.div
            style={{
              position: "absolute",
              top: -(radius + 10),
              left: -4,
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: colors.mid,
              boxShadow: `0 0 10px ${colors.mid}`,
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.8, 1, 0.8],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          />
        </motion.div>
      ))}
    </div>
  );
}