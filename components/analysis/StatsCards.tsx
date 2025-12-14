"use client";

import { motion, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";
import {
  FileCode,
  Folder,
  GitCommit,
  GitBranch,
  Star,
  GitFork,
} from "lucide-react";
import { GlassCard } from "../ui/GlassCard";
import { RepoStats } from "@/types";
import { formatNumber } from "@/lib/utils";

interface StatsCardsProps {
  stats: RepoStats;
}

function AnimatedCounter({ value }: { value: number }) {
  const spring = useSpring(0, { stiffness: 50, damping: 20 });
  const display = useTransform(spring, (v) => formatNumber(Math.round(v)));

  useEffect(() => {
    spring.set(value);
  }, [value, spring]);

  return <motion.span>{display}</motion.span>;
}

export function StatsCards({ stats }: StatsCardsProps) {
  const statItems = [
    { icon: FileCode, label: "Files", value: stats.totalFiles },
    { icon: Folder, label: "Folders", value: stats.totalFolders },
    { icon: GitCommit, label: "Commits", value: stats.commits },
    { icon: GitBranch, label: "Branches", value: stats.branches },
    { icon: Star, label: "Stars", value: stats.stars },
    { icon: GitFork, label: "Forks", value: stats.forks },
  ];

  // Calculate total bytes for language percentages
  const totalBytes = Object.values(stats.languages).reduce(
    (sum, val) => sum + val,
    0
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.6 }}
    >
      <h3 className="text-2xl font-bold text-white mb-6">Repository Stats</h3>

      {/* Quick stats grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
        {statItems.map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7 + index * 0.05 }}
          >
            <GlassCard className="text-center py-4">
              <item.icon className="w-6 h-6 mx-auto mb-2 text-purple-400" />
              <div className="text-2xl font-bold text-white">
                <AnimatedCounter value={item.value} />
              </div>
              <div className="text-sm text-white/60">{item.label}</div>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      {/* Language breakdown */}
      {totalBytes > 0 && (
        <GlassCard hover={false}>
          <h4 className="text-lg font-semibold text-white mb-4">Languages</h4>
          <div className="space-y-3">
            {Object.entries(stats.languages)
              .sort(([, a], [, b]) => b - a)
              .slice(0, 5)
              .map(([language, bytes], index) => {
                const percentage = ((bytes / totalBytes) * 100).toFixed(1);
                return (
                  <motion.div
                    key={language}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                  >
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-white">{language}</span>
                      <span className="text-white/60">{percentage}%</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{
                          background: getLanguageColor(language),
                        }}
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage}%` }}
                        transition={{ duration: 1, delay: 0.9 + index * 0.1 }}
                      />
                    </div>
                  </motion.div>
                );
              })}
          </div>
        </GlassCard>
      )}
    </motion.div>
  );
}

function getLanguageColor(language: string): string {
  const colors: { [key: string]: string } = {
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
  return colors[language] || "#8b5cf6";
}