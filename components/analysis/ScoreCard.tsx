"use client";

import { motion } from "framer-motion";
import { Trophy, Star, Zap } from "lucide-react";
import { ProgressRing } from "../ui/ProgressRing";
import { GlassCard } from "../ui/GlassCard";
import { getTierColor } from "@/lib/utils";
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
  const tierIcons = {
    Bronze: Star,
    Silver: Zap,
    Gold: Trophy,
  };

  const TierIcon = tierIcons[tier];

  const breakdownItems = [
    { label: "Code Quality", value: breakdown.codeQuality, max: 25 },
    { label: "Structure", value: breakdown.structure, max: 20 },
    { label: "Documentation", value: breakdown.documentation, max: 20 },
    { label: "Testing", value: breakdown.testing, max: 15 },
    { label: "Git Practices", value: breakdown.gitPractices, max: 20 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <GlassCard className="relative overflow-hidden" hover={false}>
        {/* Background glow */}
        <div
          className={`absolute -top-20 -right-20 w-64 h-64 bg-gradient-to-r ${getTierColor(tier)} opacity-20 blur-3xl rounded-full`}
        />

        <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8">
          {/* Score Ring */}
          <div className="flex-shrink-0">
            <ProgressRing progress={score} size={200} tier={tier} />
          </div>

          {/* Info */}
          <div className="flex-1 text-center lg:text-left">
            <h2 className="text-3xl font-bold text-white mb-2">{repoName}</h2>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mb-6">
              {/* Tier Badge */}
              <motion.div
                className={`flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${getTierColor(tier)} shadow-glow`}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.5 }}
              >
                <TierIcon className="w-5 h-5 text-white" />
                <span className="font-bold text-white">{tier}</span>
              </motion.div>

              {/* Category Badge */}
              <motion.div
                className="px-4 py-2 rounded-full border border-white/20 bg-white/5"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.6 }}
              >
                <span className="text-white/80">{category}</span>
              </motion.div>
            </div>

            {/* Breakdown */}
            <div className="space-y-3">
              {breakdownItems.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                >
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-white/60">{item.label}</span>
                    <span className="text-white">
                      {item.value}/{item.max}
                    </span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${(item.value / item.max) * 100}%` }}
                      transition={{ duration: 1, delay: 0.8 + index * 0.1 }}
                    />
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