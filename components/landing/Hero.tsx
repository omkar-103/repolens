"use client";

import { motion } from "framer-motion";
import { Sparkles, Zap, Target } from "lucide-react";
import { GlassCard } from "../ui/GlassCard";

export function Hero() {
  const features = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Get insights in under 30 seconds",
    },
    {
      icon: Sparkles,
      title: "AI-Powered",
      description: "Gemini analyzes your code intelligently",
    },
    {
      icon: Target,
      title: "Actionable",
      description: "Clear roadmap to improve your repo",
    },
  ];

  return (
    <div className="text-center mb-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          <span className="text-white">Your GitHub,</span>
          <br />
          <span className="text-gradient">Analyzed in Seconds</span>
        </h1>
        <p className="text-xl text-white/60 max-w-2xl mx-auto mb-12">
          Paste any public repository URL and get instant AI-powered analysis,
          quality scores, and a personalized improvement roadmap.
        </p>
      </motion.div>

      <motion.div
        className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-16"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        {features.map((feature, index) => (
          <GlassCard
            key={feature.title}
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + index * 0.1 }}
          >
            <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
              <feature.icon className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">
              {feature.title}
            </h3>
            <p className="text-white/60 text-sm">{feature.description}</p>
          </GlassCard>
        ))}
      </motion.div>
    </div>
  );
}