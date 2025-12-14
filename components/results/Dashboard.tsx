"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Share2, Github, ExternalLink } from "lucide-react";
import { ScoreCard } from "../analysis/ScoreCard";
import { SummarySection } from "../analysis/SummarySection";
import { RoadmapSection } from "../analysis/RoadmapSection";
import { StatsCards } from "../analysis/StatsCards";
import { AnimatedButton } from "../ui/AnimatedButton";
import { GlassCard } from "../ui/GlassCard";
import { AnalysisResult } from "@/types";

interface DashboardProps {
  result: AnalysisResult & { repoName: string; repoDescription: string };
  onBack: () => void;
}

export function Dashboard({ result, onBack }: DashboardProps) {
  const handleShare = async () => {
    const shareText = `🔍 RepoLens Analysis: ${result.repoName}\n📊 Score: ${result.score}/100 (${result.tier} Tier)\n\n✨ Analyze your repos at RepoLens!`;

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
    <div className="min-h-screen relative">
      {/* Top gradient */}
      <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-purple-500/10 via-blue-500/5 to-transparent pointer-events-none" />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative z-10"
      >
        {/* Header - Full Width */}
        <header className="sticky top-0 z-50 glass border-b border-white/5">
          <div className="full-width-container py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <AnimatedButton
                  variant="ghost"
                  onClick={onBack}
                  className="group"
                >
                  <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                  <span>Back</span>
                </AnimatedButton>
                
                <div className="hidden sm:flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                    <Github className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h1 className="text-white font-semibold">{result.repoName}</h1>
                    <p className="text-white/40 text-sm">Analysis Results</p>
                  </div>
                </div>
              </div>

              <AnimatedButton
                variant="secondary"
                onClick={handleShare}
                icon={<Share2 className="w-4 h-4" />}
              >
                Share Results
              </AnimatedButton>
            </div>
          </div>
        </header>

        {/* Main Content - Full Width with proper spacing */}
        <main className="full-width-container py-12">
          {/* Score Section - Hero Level */}
          <section className="mb-16">
            <ScoreCard
              score={result.score}
              tier={result.tier}
              category={result.category}
              breakdown={result.breakdown}
              repoName={result.repoName}
            />
          </section>

          {/* Section Divider */}
          <div className="section-divider" />

          {/* Two Column Layout for Summary */}
          <section className="mb-16">
            <SummarySection
              summary={result.summary}
              strengths={result.strengths}
              weaknesses={result.weaknesses}
            />
          </section>

          {/* Section Divider */}
          <div className="section-divider" />

          {/* Roadmap - Full Width */}
          <section className="mb-16">
            <RoadmapSection roadmap={result.roadmap} />
          </section>

          {/* Section Divider */}
          <div className="section-divider" />

          {/* Stats Section - Grid Layout */}
          <section>
            <StatsCards stats={result.stats} />
          </section>
        </main>

        {/* Footer */}
        <footer className="border-t border-white/5 mt-8">
          <div className="full-width-container py-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                  <span className="text-white font-bold">R</span>
                </div>
                <span className="text-white/40 text-sm">
                  Built with Next.js & Gemini AI
                </span>
              </div>
              <p className="text-gradient font-bold font-display text-xl">RepoLens</p>
            </div>
          </div>
        </footer>
      </motion.div>
    </div>
  );
}