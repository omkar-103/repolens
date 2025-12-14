"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Share2, Github, Code2, Heart } from "lucide-react";
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
          <section className="pt-20 pb-24 sm:pt-28 sm:pb-32 lg:pt-32 lg:pb-36">
            <ScoreCard
              score={result.score}
              tier={result.tier}
              category={result.category}
              breakdown={result.breakdown}
              repoName={result.repoName}
            />
          </section>

          {/* DIVIDER 1 */}
          <div className="py-4">
            <div className="h-px bg-gradient-to-r from-transparent via-purple-500/40 to-transparent" />
          </div>

          {/* SECTION 2: AI Analysis */}
          <section className="pt-20 pb-24 sm:pt-24 sm:pb-28 lg:pt-28 lg:pb-32">
            <SummarySection
              summary={result.summary}
              strengths={result.strengths}
              weaknesses={result.weaknesses}
            />
          </section>

          {/* DIVIDER 2 */}
          <div className="py-4">
            <div className="h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />
          </div>

          {/* SECTION 3: Roadmap */}
          <section className="pt-20 pb-24 sm:pt-24 sm:pb-28 lg:pt-28 lg:pb-32">
            <RoadmapSection roadmap={result.roadmap} />
          </section>

          {/* DIVIDER 3 */}
          <div className="py-4">
            <div className="h-px bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />
          </div>

          {/* SECTION 4: Stats */}
          <section className="pt-20 pb-24 sm:pt-24 sm:pb-28 lg:pt-28 lg:pb-32">
            <StatsCards stats={result.stats} />
          </section>

        </main>

        {/* FOOTER */}
        <footer className="border-t border-white/5 mt-16">
          <div className="h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
          
          <div className="full-width-container py-16 sm:py-20">
            <div className="flex flex-col items-center gap-8">
              
              {/* Logo */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center shadow-lg shadow-purple-500/20">
                  <Code2 className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  RepoLens
                </span>
              </div>

              {/* Creator */}
              <div className="flex flex-col items-center text-center">
                <p className="text-white/30 text-sm flex items-center gap-1.5 mb-1">
                  Built with <Heart className="w-3 h-3 text-red-400 fill-red-400" /> by
                </p>
                <p className="text-white font-medium">Omkar Parelkar</p>
              </div>

              {/* Analyze Another Button */}
              <motion.button
                onClick={onBack}
                className="flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 text-white font-semibold shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Analyze Another Repository
              </motion.button>

              {/* Copyright */}
              <p className="text-white/20 text-sm">
                © {new Date().getFullYear()} RepoLens. All rights reserved.
              </p>
            </div>
          </div>
        </footer>

      </motion.div>
    </div>
  );
}