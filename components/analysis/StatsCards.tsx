"use client";

import { motion, useSpring, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import {
  FileCode2,
  FolderTree,
  GitCommit,
  GitBranch,
  Star,
  GitFork,
  Code2,
  Calendar,
  Clock,
} from "lucide-react";
import { GlassCard } from "../ui/GlassCard";
import { RepoStats } from "@/types";
import { formatNumber } from "@/lib/utils";

interface StatsCardsProps {
  stats: RepoStats;
}

function AnimatedCounter({ value }: { value: number }) {
  const [mounted, setMounted] = useState(false);
  const spring = useSpring(0, { stiffness: 50, damping: 20 });
  const display = useTransform(spring, (v) => formatNumber(Math.round(v)));

  useEffect(() => {
    setMounted(true);
    spring.set(value);
  }, [value, spring]);

  if (!mounted) return <span>0</span>;
  
  return <motion.span>{display}</motion.span>;
}

const languageColors: { [key: string]: string } = {
  TypeScript: "#3178c6",
  JavaScript: "#f7df1e",
  Python: "#3572A5",
  Java: "#b07219",
  "C++": "#f34b7d",
  C: "#555555",
  Go: "#00ADD8",
  Rust: "#dea584",
  Ruby: "#701516",
  PHP: "#4F5D95",
  Swift: "#ffac45",
  Kotlin: "#A97BFF",
  CSS: "#563d7c",
  HTML: "#e34c26",
  Shell: "#89e051",
  SCSS: "#c6538c",
  Vue: "#41b883",
  Svelte: "#ff3e00",
};

export function StatsCards({ stats }: StatsCardsProps) {
  const statItems = [
    { icon: FileCode2, label: "Files", value: stats.totalFiles, color: "from-blue-500 to-cyan-500" },
    { icon: FolderTree, label: "Folders", value: stats.totalFolders, color: "from-purple-500 to-pink-500" },
    { icon: GitCommit, label: "Commits", value: stats.commits, color: "from-green-500 to-emerald-500" },
    { icon: GitBranch, label: "Branches", value: stats.branches, color: "from-orange-500 to-amber-500" },
    { icon: Star, label: "Stars", value: stats.stars, color: "from-yellow-500 to-orange-500" },
    { icon: GitFork, label: "Forks", value: stats.forks, color: "from-pink-500 to-rose-500" },
  ];

  const totalBytes = Object.values(stats.languages).reduce((sum, val) => sum + val, 0);
  const sortedLanguages = Object.entries(stats.languages)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 8);

  return (
    <div className="space-y-12">
      {/* Section Header - PROMINENT */}
      <motion.div
        className="flex items-center gap-5"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
          <Code2 className="w-8 h-8 text-white" />
        </div>
        <div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white font-display">Repository Statistics</h2>
          <p className="text-white/40 text-lg">Detailed breakdown of your codebase</p>
        </div>
      </motion.div>

      {/* Stats Grid - Full Width, Generous Spacing */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
        {statItems.map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.1 + index * 0.08, type: "spring" }}
          >
            <GlassCard className="text-center relative group" padding="xl" tilt>
              {/* Hover glow */}
              <div 
                className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-2xl bg-gradient-to-r ${item.color}`}
                style={{ transform: "scale(0.6)" }} 
              />
              
              {/* Icon */}
              <motion.div
                className={`w-16 h-16 mx-auto mb-5 rounded-2xl bg-gradient-to-br ${item.color} p-[1px]`}
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <div className="w-full h-full rounded-2xl bg-background/80 flex items-center justify-center">
                  <item.icon className="w-7 h-7 text-white" />
                </div>
              </motion.div>

              {/* Value */}
              <div className="text-4xl font-bold text-white font-display mb-2">
                <AnimatedCounter value={item.value} />
              </div>

              {/* Label */}
              <div className="text-base text-white/50 font-medium">{item.label}</div>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      {/* Two Column Layout for Languages and Timeline */}
      <div className="grid lg:grid-cols-3 gap-10">
        {/* Languages - Takes 2 columns */}
        {totalBytes > 0 && (
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <GlassCard className="h-full" padding="2xl" hover={false}>
              <div className="flex items-center justify-between mb-10">
                <h3 className="text-2xl font-bold text-white font-display">Languages</h3>
                <span className="text-white/40 text-sm font-mono px-4 py-2 rounded-xl bg-white/5">
                  {sortedLanguages.length} detected
                </span>
              </div>

              {/* Language bar */}
              <div className="h-5 rounded-full overflow-hidden flex mb-10 bg-white/5">
                {sortedLanguages.map(([language, bytes], index) => {
                  const percentage = (bytes / totalBytes) * 100;
                  return (
                    <motion.div
                      key={language}
                      className="h-full relative group cursor-pointer"
                      style={{
                        width: `${percentage}%`,
                        backgroundColor: languageColors[language] || "#8b5cf6",
                      }}
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      transition={{ duration: 1, delay: 0.6 + index * 0.1 }}
                      whileHover={{ filter: "brightness(1.3)" }}
                    >
                      {/* Tooltip */}
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-4 py-2 rounded-xl bg-white/10 backdrop-blur-xl text-white text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-white/10">
                        {language}: {percentage.toFixed(1)}%
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Language list */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                {sortedLanguages.map(([language, bytes], index) => {
                  const percentage = ((bytes / totalBytes) * 100).toFixed(1);
                  const color = languageColors[language] || "#8b5cf6";

                  return (
                    <motion.div
                      key={language}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8 + index * 0.1 }}
                      className="flex items-center gap-4 group"
                    >
                      <div
                        className="w-5 h-5 rounded-full flex-shrink-0 transition-transform group-hover:scale-125"
                        style={{ 
                          backgroundColor: color,
                          boxShadow: `0 0 15px ${color}60`,
                        }}
                      />
                      <div className="flex-1 min-w-0">
                        <span className="text-white/80 font-medium truncate block">
                          {language}
                        </span>
                        <span className="text-white/40 text-sm font-mono">
                          {percentage}%
                        </span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </GlassCard>
          </motion.div>
        )}

        {/* Timeline - Takes 1 column */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="space-y-6"
        >
          <GlassCard padding="xl" hover={false}>
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-2xl bg-green-500/20 flex items-center justify-center">
                <Calendar className="w-8 h-8 text-green-400" />
              </div>
              <div>
                <p className="text-white/40 text-sm mb-1">Created</p>
                <p className="text-white font-semibold text-xl">
                  {stats.createdAt ? new Date(stats.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  }) : "Unknown"}
                </p>
              </div>
            </div>
          </GlassCard>

          <GlassCard padding="xl" hover={false}>
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-2xl bg-blue-500/20 flex items-center justify-center">
                <Clock className="w-8 h-8 text-blue-400" />
              </div>
              <div>
                <p className="text-white/40 text-sm mb-1">Last Updated</p>
                <p className="text-white font-semibold text-xl">
                  {stats.lastUpdated ? new Date(stats.lastUpdated).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  }) : "Unknown"}
                </p>
              </div>
            </div>
          </GlassCard>

          <GlassCard padding="xl" hover={false}>
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-2xl bg-purple-500/20 flex items-center justify-center">
                <Code2 className="w-8 h-8 text-purple-400" />
              </div>
              <div>
                <p className="text-white/40 text-sm mb-1">Est. Lines of Code</p>
                <p className="text-white font-semibold text-xl font-mono">
                  <AnimatedCounter value={stats.linesOfCode} />
                </p>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
}