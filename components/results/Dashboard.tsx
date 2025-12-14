"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Share2, Github } from "lucide-react";
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
      <div className="absolute top-0 left-0 right-0 h-[600px] bg-gradient-to-b from-purple-500/10 via-blue-500/5 to-transparent pointer-events-none" />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative z-10"
      >
        {/* Header - Sticky */}
        <header className="sticky top-0 z-50 glass border-b border-white/5">
          <div className="full-width-container py-5">
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
                    <p className="text-white/40 text-sm">Analysis Complete</p>
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

        {/* Main Content with GENEROUS SPACING */}
        <main className="full-width-container">
          {/* SECTION 1: Score - Hero Level */}
          <section className="py-16 sm:py-20">
            <ScoreCard
              score={result.score}
              tier={result.tier}
              category={result.category}
              breakdown={result.breakdown}
              repoName={result.repoName}
            />
          </section>

          {/* STRONG DIVIDER */}
          <div className="section-divider-strong" />

          {/* SECTION 2: AI Analysis */}
          <section className="py-12 sm:py-16">
            <SummarySection
              summary={result.summary}
              strengths={result.strengths}
              weaknesses={result.weaknesses}
            />
          </section>

          {/* STRONG DIVIDER */}
          <div className="section-divider-strong" />

          {/* SECTION 3: Roadmap */}
          <section className="py-12 sm:py-16">
            <RoadmapSection roadmap={result.roadmap} />
          </section>

          {/* STRONG DIVIDER */}
          <div className="section-divider-strong" />

          {/* SECTION 4: Stats */}
          <section className="py-12 sm:py-16">
            <StatsCards stats={result.stats} />
          </section>
        </main>

      
      </motion.div>
    </div>
  );
}