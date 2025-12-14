"use client";

import { motion, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";
import { getTierColor } from "@/lib/utils";

interface ProgressRingProps {
  progress: number;
  size?: number;
  strokeWidth?: number;
  tier?: "Bronze" | "Silver" | "Gold";
}

export function ProgressRing({
  progress,
  size = 200,
  strokeWidth = 12,
  tier = "Bronze",
}: ProgressRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;

  const springProgress = useSpring(0, { stiffness: 50, damping: 20 });
  const strokeDashoffset = useTransform(
    springProgress,
    [0, 100],
    [circumference, 0]
  );

  const displayNumber = useTransform(springProgress, (latest) =>
    Math.round(latest)
  );

  useEffect(() => {
    springProgress.set(progress);
  }, [progress, springProgress]);

  const gradientId = `progress-gradient-${tier}`;
  const glowId = `progress-glow-${tier}`;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      {/* Glow effect */}
      <div
        className={`absolute inset-0 rounded-full bg-gradient-to-r ${getTierColor(tier)} opacity-20 blur-xl`}
      />

      <svg width={size} height={size} className="transform -rotate-90">
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8b5cf6" />
            <stop offset="50%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
          <filter id={glowId}>
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
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
          stroke="rgba(255,255,255,0.1)"
          strokeWidth={strokeWidth}
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
        <motion.span className="text-5xl font-bold text-white">
          {displayNumber}
        </motion.span>
        <span className="text-white/60 text-sm mt-1">/ 100</span>
      </div>
    </div>
  );
}