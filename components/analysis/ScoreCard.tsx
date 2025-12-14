"use client";

import { motion } from "framer-motion";
import { Trophy, Star, Zap, Award, TrendingUp } from "lucide-react";
import { ProgressRing } from "../ui/ProgressRing";
import { GlassCard } from "../ui/GlassCard";
import { ScoreBreakdown } from "@/types";

interface ScoreCardProps {
  score: number;
  tier: "Bronze" | "Silver" | "Gold";
  category: "Beginner" | "Intermediate" | "Advanced";
  breakdown: ScoreBreakdown;
  repoName: string;
}

export function ScoreCard({
  score,
  tier,
  category,
  breakdown,
  repoName,
}: ScoreCardProps) {
  const tierConfig = {
    Bronze: { 
      icon: Star, 
      gradient: "from-orange-400 to-amber-600",
      glow: "rgba(251, 146, 60, 0.3)",
    },
    Silver: { 
      icon: Zap, 
      gradient: "from-gray-300 to-gray-500",
      glow: "rgba(156, 163, 175, 0.3)",
    },
    Gold: { 
      icon: Trophy, 
      gradient: "from-yellow-400 to-amber-500",
      glow: "rgba(251, 191, 36, 0.3)",
    },
  };

  const config = tierConfig[tier];
  const TierIcon = config.icon;

  const breakdownItems = [
    { label: "Code Quality", value: breakdown.codeQuality, max: 25, icon: "💎", color: "from-purple-500 to-purple-400" },
    { label: "Structure", value: breakdown.structure, max: 20, icon: "🏗️", color: "from-blue-500 to-blue-400" },
    { label: "Documentation", value: breakdown.documentation, max: 20, icon: "📚", color: "from-cyan-500 to-cyan-400" },
    { label: "Testing", value: breakdown.testing, max: 15, icon: "🧪", color: "from-green-500 to-green-400" },
    { label: "Git Practices", value: breakdown.gitPractices, max: 20, icon: "🌿", color: "from-emerald-500 to-emerald-400" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <GlassCard className="relative overflow-hidden" padding="xl" hover={false}>
        {/* Background glow */}
        <div 
          className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full blur-3xl opacity-30"
          style={{ background: `radial-gradient(circle, ${config.glow}, transparent)` }}
        />
        <div 
          className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full blur-3xl opacity-20"
          style={{ background: `radial-gradient(circle, rgba(168, 85, 247, 0.3), transparent)` }}
        />

        <div className="relative z-10">
          {/* Grid Layout - Score Left, Breakdown Right */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Side - Score */}
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
              {/* Score Ring */}
              <motion.div
                className="mb-8"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.3 }}
              >
                <ProgressRing progress={score} size={260} tier={tier} />
              </motion.div>

              {/* Repo name */}
              <motion.h2
                className="text-4xl sm:text-5xl font-bold text-white mb-6 font-display"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                {repoName}
              </motion.h2>

              {/* Badges */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
                {/* Tier Badge */}
                <motion.div
                  className={`flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r ${config.gradient}`}
                  initial={{ scale: 0, rotate: -10 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", delay: 0.5 }}
                  style={{ boxShadow: `0 0 40px ${config.glow}` }}
                >
                  <TierIcon className="w-6 h-6 text-white" />
                  <span className="font-bold text-white text-lg">{tier} Tier</span>
                </motion.div>

                {/* Category Badge */}
                <motion.div
                  className="flex items-center gap-2 px-6 py-3 rounded-2xl border border-white/20 bg-white/5 backdrop-blur"
                  initial={{ scale: 0, rotate: 10 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", delay: 0.6 }}
                >
                  <Award className="w-5 h-5 text-white/60" />
                  <span className="text-white/80 font-medium text-lg">{category}</span>
                </motion.div>
              </div>
            </div>

            {/* Right Side - Breakdown */}
            <div className="space-y-6">
              <motion.h3
                className="text-xl font-semibold text-white/80 mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                Score Breakdown
              </motion.h3>

              {breakdownItems.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="group"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{item.icon}</span>
                      <span className="text-white/70 font-medium">{item.label}</span>
                    </div>
                    <span className="text-white font-bold font-mono text-lg">
                      {item.value}<span className="text-white/40">/{item.max}</span>
                    </span>
                  </div>
                  <div className="h-3 bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full rounded-full bg-gradient-to-r ${item.color} relative`}
                      initial={{ width: 0 }}
                      animate={{ width: `${(item.value / item.max) * 100}%` }}
                      transition={{ duration: 1.2, delay: 0.8 + index * 0.1, ease: "easeOut" }}
                    >
                      {/* Shimmer effect */}
                      <motion.div
                        className="absolute inset-0"
                        style={{
                          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
                        }}
                        animate={{ x: ["-100%", "200%"] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 1.5 + index * 0.1 }}
                      />
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
}