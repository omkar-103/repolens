//components/landing/Hero.tsx
"use client";

import { motion } from "framer-motion";
import { Sparkles, Zap, Target, ArrowDown, Github, BarChart3, Shield, Code2 } from "lucide-react";
import { GlassCard } from "../ui/GlassCard";

export function Hero() {
  const features = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Comprehensive insights in under 30 seconds",
      gradient: "from-yellow-400 to-orange-500",
    },
    {
      icon: Sparkles,
      title: "AI-Powered",
      description: "Gemini AI analyzes your code intelligently",
      gradient: "from-purple-400 to-pink-500",
    },
    {
      icon: Target,
      title: "Actionable Roadmap",
      description: "Clear steps to improve your repository",
      gradient: "from-cyan-400 to-blue-500",
    },
  ];

  return (
    <div className="w-full">
      {/* Main Hero Section - Full Width with Side Elements */}
      <div className="relative min-h-[80vh] flex items-center">
        {/* Left Side Visual Anchor */}
        <motion.div
          className="absolute left-0 top-1/2 -translate-y-1/2 hidden xl:block"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="flex flex-col gap-6 pl-8">
            {[
              { icon: Code2, label: "Analyze" },
              { icon: BarChart3, label: "Score" },
              { icon: Shield, label: "Improve" },
            ].map((item, index) => (
              <motion.div
                key={item.label}
                className="flex items-center gap-3 text-white/30"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 0.5, x: 0 }}
                transition={{ delay: 0.8 + index * 0.2 }}
                whileHover={{ opacity: 1, x: 10 }}
              >
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                  <item.icon className="w-5 h-5" />
                </div>
                <span className="text-sm font-medium tracking-wide">{item.label}</span>
              </motion.div>
            ))}
            
            {/* Connecting Line */}
            <div className="absolute left-[2.25rem] top-16 bottom-16 w-px bg-gradient-to-b from-purple-500/50 via-blue-500/50 to-cyan-500/50" />
          </div>
        </motion.div>

        {/* Right Side Visual Anchor */}
        <motion.div
          className="absolute right-0 top-1/2 -translate-y-1/2 hidden xl:block"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="pr-8">
            {/* Mini Preview Card */}
            <motion.div
              className="w-64 glass-card rounded-2xl p-5 border border-white/10"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                  <Github className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-white/80 text-sm font-medium">Sample Repo</p>
                  <p className="text-white/40 text-xs">Analyzing...</p>
                </div>
              </div>
              
              {/* Mini Progress */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-white/40">Score</span>
                  <span className="text-green-400 font-mono">87/100</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: "87%" }}
                    transition={{ duration: 2, delay: 1 }}
                  />
                </div>
              </div>
              
              {/* Mini Stats */}
              <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-white/10">
                {[
                  { label: "Files", value: "142" },
                  { label: "Commits", value: "89" },
                  { label: "Stars", value: "1.2k" },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <p className="text-white font-semibold text-sm">{stat.value}</p>
                    <p className="text-white/30 text-xs">{stat.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Center Content */}
        <div className="w-full max-w-4xl mx-auto px-4 text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass mb-10 border border-white/10"
          >
            <motion.span
              className="w-2 h-2 rounded-full bg-green-400"
              animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-white/60 text-sm font-medium">AI-Powered Repository Analysis</span>
          </motion.div>

          {/* Main heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-8 font-display tracking-tight leading-[1.1]">
              <span className="text-white">Your GitHub,</span>
              <br />
              <span className="text-gradient">Analyzed</span>
              <span className="text-white"> in </span>
              <span className="text-gradient-cyan">Seconds</span>
            </h1>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            className="text-lg sm:text-xl text-white/50 max-w-2xl mx-auto mb-12 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Paste any public repository URL and get instant AI-powered analysis,
            quality scores, and a personalized improvement roadmap.
          </motion.p>

          {/* Scroll indicator */}
          <motion.div
            className="flex flex-col items-center gap-2 text-white/30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <span className="text-sm">Enter your repo below</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowDown className="w-5 h-5" />
            </motion.div>
          </motion.div>
        </div>

        
      </div>

      {/* Feature cards - With proper spacing */}
      <motion.div
        className="w-full max-w-6xl mx-auto px-4 mt-8"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + index * 0.15 }}
            >
              <GlassCard className="text-center h-full" padding="lg" tilt>
                {/* Icon container */}
                <motion.div
                  className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${feature.gradient} p-[1px]`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <div className="w-full h-full rounded-2xl bg-background/80 flex items-center justify-center backdrop-blur-xl">
                    <feature.icon className="w-7 h-7 text-white" />
                  </div>
                </motion.div>

                <h3 className="text-xl font-semibold text-white mb-3 font-display">
                  {feature.title}
                </h3>
                <p className="text-white/50 text-base leading-relaxed">
                  {feature.description}
                </p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}