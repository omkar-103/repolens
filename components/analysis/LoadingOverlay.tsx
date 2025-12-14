"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { ProgressRing } from "../ui/ProgressRing";
import { AnalysisStatus } from "@/types";

interface LoadingOverlayProps {
  isVisible: boolean;
  status: AnalysisStatus;
}

const statusMessages: Record<AnalysisStatus, string> = {
  idle: "",
  fetching: "Fetching repository data...",
  analyzing: "Analyzing code structure...",
  generating: "Generating AI insights...",
  complete: "Analysis complete!",
  error: "Something went wrong",
};

export function LoadingOverlay({ isVisible, status }: LoadingOverlayProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (status === "fetching") setProgress(30);
    else if (status === "analyzing") setProgress(60);
    else if (status === "generating") setProgress(85);
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
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-xl"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="glass-strong p-12 text-center max-w-md mx-4 relative"
          >
            {/* Particle effects around progress */}
            <div className="relative">
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 rounded-full bg-purple-500"
                    style={{
                      transform: `rotate(${i * 45}deg) translateY(-120px)`,
                    }}
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.3, 0.8, 0.3],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                  />
                ))}
              </motion.div>

              <ProgressRing progress={progress} size={200} />
            </div>

            <motion.p
              key={status}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-white/80 text-lg mt-8"
            >
              {statusMessages[status]}
            </motion.p>

            {/* Pulsing glow effect */}
            <motion.div
              className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/10 to-blue-500/10 -z-10"
              animate={{
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}