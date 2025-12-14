"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { AnalysisStatus } from "@/types";
import { Code2, GitBranch, FileCode, Sparkles, CheckCircle } from "lucide-react";

interface LoadingOverlayProps {
  isVisible: boolean;
  status: AnalysisStatus;
}

const statusConfig: Record<AnalysisStatus, { message: string; icon: React.ElementType; color: string }> = {
  idle: { message: "", icon: Code2, color: "#a855f7" },
  fetching: { message: "Fetching repository data...", icon: GitBranch, color: "#3b82f6" },
  analyzing: { message: "Analyzing code structure...", icon: FileCode, color: "#06b6d4" },
  generating: { message: "Generating AI insights...", icon: Sparkles, color: "#ec4899" },
  complete: { message: "Analysis complete!", icon: CheckCircle, color: "#10b981" },
  error: { message: "Something went wrong", icon: Code2, color: "#ef4444" },
};

export function LoadingOverlay({ isVisible, status }: LoadingOverlayProps) {
  const [progress, setProgress] = useState(0);
  const config = statusConfig[status];
  const Icon = config.icon;

  useEffect(() => {
    if (status === "fetching") setProgress(25);
    else if (status === "analyzing") setProgress(50);
    else if (status === "generating") setProgress(75);
    else if (status === "complete") setProgress(100);
    else if (status === "idle") setProgress(0);
  }, [status]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center"
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-background/90 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Content */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="relative z-10 flex flex-col items-center"
          >
            {/* Main orb container */}
            <div className="relative w-64 h-64 flex items-center justify-center">
              {/* Rotating rings */}
              <motion.div
                className="absolute inset-0"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              >
                <svg className="w-full h-full">
                  <defs>
                    <linearGradient id="ring-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#a855f7" />
                      <stop offset="50%" stopColor="#3b82f6" />
                      <stop offset="100%" stopColor="#06b6d4" />
                    </linearGradient>
                  </defs>
                  <circle
                    cx="128"
                    cy="128"
                    r="120"
                    fill="none"
                    stroke="url(#ring-gradient)"
                    strokeWidth="2"
                    strokeDasharray="20 30"
                    opacity="0.5"
                  />
                </svg>
              </motion.div>

              <motion.div
                className="absolute inset-4"
                animate={{ rotate: -360 }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              >
                <svg className="w-full h-full">
                  <circle
                    cx="112"
                    cy="112"
                    r="100"
                    fill="none"
                    stroke="rgba(255,255,255,0.1)"
                    strokeWidth="1"
                    strokeDasharray="10 20"
                  />
                </svg>
              </motion.div>

              {/* Center orb */}
              <motion.div
                className="relative w-32 h-32 rounded-full flex items-center justify-center"
                style={{
                  background: `radial-gradient(circle at 30% 30%, ${config.color}40, ${config.color}10)`,
                  boxShadow: `0 0 60px ${config.color}40, inset 0 0 30px ${config.color}20`,
                }}
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                {/* Icon */}
                <motion.div
                  key={status}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  <Icon 
                    className="w-12 h-12" 
                    style={{ color: config.color }}
                  />
                </motion.div>

                {/* Orbiting particles */}
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="absolute w-3 h-3 rounded-full"
                    style={{
                      background: config.color,
                      boxShadow: `0 0 10px ${config.color}`,
                    }}
                    animate={{
                      rotate: 360,
                    }}
                    transition={{
                      duration: 3 + i,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <motion.div
                      style={{
                        position: "absolute",
                        top: -(50 + i * 10),
                        left: -6,
                        width: 12,
                        height: 12,
                        borderRadius: "50%",
                        background: config.color,
                        boxShadow: `0 0 15px ${config.color}`,
                      }}
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.5, 1, 0.5],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        delay: i * 0.3,
                      }}
                    />
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Progress bar */}
            <div className="w-64 mt-8">
              <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    background: `linear-gradient(90deg, #a855f7, #3b82f6, #06b6d4)`,
                  }}
                  initial={{ width: "0%" }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
              </div>
            </div>

            {/* Status message */}
            <motion.p
              key={status}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-white/70 text-lg mt-6 font-medium"
            >
              {config.message}
            </motion.p>

            {/* Stage indicators */}
            <div className="flex items-center gap-3 mt-8">
              {["fetching", "analyzing", "generating", "complete"].map((stage, index) => {
                const stageIndex = ["fetching", "analyzing", "generating", "complete"].indexOf(status);
                const isActive = index <= stageIndex;
                const isCurrent = stage === status;
                
                return (
                  <motion.div
                    key={stage}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      isActive ? "bg-white" : "bg-white/20"
                    }`}
                    animate={isCurrent ? { scale: [1, 1.5, 1] } : {}}
                    transition={{ duration: 1, repeat: Infinity }}
                    style={{
                      boxShadow: isActive ? `0 0 10px ${config.color}` : "none",
                    }}
                  />
                );
              })}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}