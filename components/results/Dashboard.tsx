"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Share2 } from "lucide-react";
import { ScoreCard } from "../analysis/ScoreCard";
import { SummarySection } from "../analysis/SummarySection";
import { RoadmapSection } from "../analysis/RoadmapSection";
import { StatsCards } from "../analysis/StatsCards";
import { AnimatedButton } from "../ui/AnimatedButton";
import { AnalysisResult } from "@/types";

interface DashboardProps {
  result: AnalysisResult & { repoName: string; repoDescription: string };
  onBack: () => void;
}

export function Dashboard({ result, onBack }: DashboardProps) {
  const handleShare = async () => {
    const shareText = `🔍 RepoLens Analysis: ${result.repoName}\n📊 Score: ${result.score}/100 (${result.tier})\n\nAnalyze your repos at RepoLens!`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: "RepoLens Analysis",
          text: shareText,
        });
      } catch {
        await navigator.clipboard.writeText(shareText);
        alert("Results copied to clipboard!");
      }
    } else {
      await navigator.clipboard.writeText(shareText);
      alert("Results copied to clipboard!");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen py-8 px-4"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <AnimatedButton
            variant="ghost"
            onClick={onBack}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            Analyze Another
          </AnimatedButton>

          <AnimatedButton
            variant="secondary"
            onClick={handleShare}
            className="flex items-center gap-2"
          >
            <Share2 className="w-5 h-5" />
            Share Results
          </AnimatedButton>
        </motion.div>

        {/* Main Content */}
        <div className="space-y-8">
          <ScoreCard
            score={result.score}
            tier={result.tier}
            category={result.category}
            breakdown={result.breakdown}
            repoName={result.repoName}
          />

          <SummarySection
            summary={result.summary}
            strengths={result.strengths}
            weaknesses={result.weaknesses}
          />

          <RoadmapSection roadmap={result.roadmap} />

          <StatsCards stats={result.stats} />
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center mt-12 py-8 border-t border-white/10"
        >
          <p className="text-white/40">
            Built with ❤️ using Next.js & Gemini AI •{" "}
            <span className="text-gradient font-semibold">RepoLens</span>
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}