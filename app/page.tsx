"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { 
  Sparkles, Zap, Target, ArrowDown, Github, BarChart3, Shield, Code2,
  AlertCircle, ArrowRight, Search, Heart, Linkedin
} from "lucide-react";
import { ParticleBackground } from "@/components/ui/ParticleBackground";
import { LoadingOverlay } from "@/components/analysis/LoadingOverlay";
import { Dashboard } from "@/components/results/Dashboard";
import { AnalysisResult, AnalysisStatus } from "@/types";
import { parseGitHubUrl } from "@/lib/utils";

// ==================== GLASS CARD COMPONENT ====================
function GlassCard({ 
  children, 
  className = "", 
  padding = "lg", 
  tilt = false,
  hover = true 
}: {
  children: React.ReactNode;
  className?: string;
  padding?: "sm" | "md" | "lg" | "xl";
  tilt?: boolean;
  hover?: boolean;
}) {
  const paddingClasses = {
    sm: "p-4 sm:p-5",
    md: "p-5 sm:p-6",
    lg: "p-6 sm:p-8",
    xl: "p-8 sm:p-10"
  };

  return (
    <motion.div
      className={`
        relative glass-card rounded-3xl backdrop-blur-xl overflow-hidden
        ${paddingClasses[padding]}
        ${hover ? "hover-lift cursor-pointer" : ""}
        ${className}
      `}
      whileHover={tilt ? { rotateY: 3, rotateX: 3, scale: 1.02 } : hover ? { scale: 1.02 } : {}}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {children}
    </motion.div>
  );
}

// ==================== ANIMATED BUTTON COMPONENT ====================
function AnimatedButton({
  children,
  onClick,
  loading = false,
  disabled = false,
  variant = "primary",
  size = "md",
  icon,
  className = ""
}: {
  children: React.ReactNode;
  onClick?: () => void;
  loading?: boolean;
  disabled?: boolean;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  icon?: React.ReactNode;
  className?: string;
}) {
  const variants = {
    primary: `
      bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500
      text-white font-semibold
      shadow-[0_0_30px_rgba(168,85,247,0.4)]
      hover:shadow-[0_0_50px_rgba(168,85,247,0.6)]
    `,
    secondary: `
      bg-white/5 border border-white/20
      text-white font-medium
      hover:bg-white/10 hover:border-white/30
    `,
    ghost: `
      text-white/70 font-medium
      hover:text-white hover:bg-white/5
    `
  };

  const sizes = {
    sm: "px-4 py-2 text-sm rounded-xl gap-2",
    md: "px-6 py-3 text-base rounded-xl gap-2",
    lg: "px-10 py-5 text-lg rounded-2xl gap-3"
  };

  return (
    <motion.button
      className={`
        relative inline-flex items-center justify-center transition-all duration-300
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
      onClick={onClick}
      disabled={disabled || loading}
      whileHover={{ scale: disabled || loading ? 1 : 1.05 }}
      whileTap={{ scale: disabled || loading ? 1 : 0.95 }}
    >
      {loading ? (
        <>
          <motion.span
            className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <span>Analyzing...</span>
        </>
      ) : (
        <>
          {icon}
          {children}
        </>
      )}
    </motion.button>
  );
}

// ==================== HERO SECTION ====================
function HeroSection() {
  return (
    <div className="w-full relative">
      {/* Animated Background Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-purple-500/20 blur-[100px]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-cyan-500/20 blur-[100px]"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3],
            x: [0, -50, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-pink-500/10 blur-[120px]"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
      </div>

      {/* Main Hero Content */}
      <div className="relative min-h-[90vh] flex items-center justify-center">
        {/* Left Side Visual Anchor - Hidden on smaller screens */}
        <motion.div
          className="absolute left-0 top-1/2 -translate-y-1/2 hidden 2xl:block z-10"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="flex flex-col gap-8 pl-12">
            {[
              { icon: Code2, label: "Analyze", color: "from-purple-500 to-purple-600" },
              { icon: BarChart3, label: "Score", color: "from-blue-500 to-cyan-500" },
              { icon: Shield, label: "Improve", color: "from-cyan-500 to-teal-500" },
            ].map((item, index) => (
              <motion.div
                key={item.label}
                className="flex items-center gap-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + index * 0.2 }}
                whileHover={{ scale: 1.05, x: 10 }}
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.color} p-[1px] shadow-lg shadow-purple-500/20`}>
                  <div className="w-full h-full rounded-2xl bg-black/50 backdrop-blur-xl flex items-center justify-center">
                    <item.icon className="w-7 h-7 text-white" />
                  </div>
                </div>
                <span className="text-base font-semibold tracking-wide text-white/60">{item.label}</span>
              </motion.div>
            ))}
            
            {/* Connecting Line */}
            <div className="absolute left-[2.9rem] top-20 bottom-20 w-0.5 bg-gradient-to-b from-purple-500/40 via-blue-500/40 to-cyan-500/40 rounded-full" />
          </div>
        </motion.div>

        {/* Right Side Visual Anchor - Hidden on smaller screens */}
        <motion.div
          className="absolute right-0 top-1/2 -translate-y-1/2 hidden 2xl:block z-10"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="pr-12">
            {/* Mini Preview Card */}
            <motion.div
              className="w-80 glass-card rounded-3xl p-7 border border-white/20 shadow-2xl shadow-purple-500/10"
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 via-purple-600 to-blue-600 flex items-center justify-center shadow-lg shadow-purple-500/30">
                  <Github className="w-7 h-7 text-white" />
                </div>
                <div>
                  <p className="text-white font-semibold">Sample Repository</p>
                  <p className="text-purple-400 text-sm font-medium">Analyzing...</p>
                </div>
              </div>
              
              {/* Mini Progress */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-white/50 font-medium text-sm">Quality Score</span>
                  <span className="text-green-400 font-bold font-mono text-lg">87/100</span>
                </div>
                <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-400 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: "87%" }}
                    transition={{ duration: 2, delay: 1, ease: "easeOut" }}
                  />
                </div>
              </div>
              
              {/* Mini Stats */}
              <div className="grid grid-cols-3 gap-4 pt-5 border-t border-white/10">
                {[
                  { label: "Files", value: "142", color: "text-purple-400" },
                  { label: "Commits", value: "89", color: "text-blue-400" },
                  { label: "Stars", value: "1.2k", color: "text-cyan-400" },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <p className={`font-bold text-lg ${stat.color}`}>{stat.value}</p>
                    <p className="text-white/40 text-xs font-medium mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Center Content - THE MAIN FOCUS */}
        <div className="w-full max-w-5xl mx-auto px-6 text-center relative z-10">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full glass-card mb-12 border border-white/20 shadow-lg shadow-purple-500/10"
          >
            <motion.span
              className="w-3 h-3 rounded-full bg-green-400 shadow-lg shadow-green-400/50"
              animate={{ 
                scale: [1, 1.3, 1], 
                opacity: [1, 0.6, 1],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-white/70 text-sm font-semibold tracking-wide">AI-Powered Repository Analysis</span>
          </motion.div>

          {/* Main heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold mb-10 tracking-tight leading-[1.05]">
              <span className="text-white drop-shadow-2xl">Your GitHub,</span>
              <br />
              <span className="text-gradient inline-block">Analyzed</span>
              <span className="text-white drop-shadow-2xl"> in </span>
              <span className="text-gradient-cyan inline-block">Seconds</span>
            </h1>
          </motion.div>

        <motion.p
  className="text-center text-xl sm:text-2xl text-white/50 max-w-3xl mx-auto mb-16 leading-relaxed font-medium"
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, delay: 0.3 }}
><br/>
  Paste any public repository URL and get instant AI-powered analysis,
  quality scores, and a personalized improvement roadmap.
</motion.p>


          {/* Scroll indicator */}
          <motion.div
            className="flex flex-col items-center gap-3 text-white/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <span className="text-sm font-medium tracking-wide">Enter your repo below</span>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <ArrowDown className="w-6 h-6" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

// ==================== URL INPUT SECTION - FORCE CENTERED ====================
function UrlInputSection({ 
  onAnalyze, 
  loading 
}: { 
  onAnalyze: (url: string) => void; 
  loading: boolean;
}) {
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const glowOpacity = useMotionValue(0);
  const glowOpacitySpring = useSpring(glowOpacity, { stiffness: 200, damping: 30 });

  useEffect(() => {
    glowOpacity.set(isFocused ? 1 : 0);
  }, [isFocused, glowOpacity]);

  useEffect(() => {
    if (url.trim()) {
      const parsed = parseGitHubUrl(url);
      setIsValid(!!parsed);
    } else {
      setIsValid(false);
    }
  }, [url]);

  const handleSubmit = () => {
    if (!url.trim()) {
      setError("Please enter a GitHub URL");
      return;
    }

    const parsed = parseGitHubUrl(url);
    if (!parsed) {
      setError("Please enter a valid GitHub repository URL");
      return;
    }

    setError("");
    onAnalyze(url);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !loading) {
      handleSubmit();
    }
  };

  const suggestions = [
    "facebook/react",
    "vercel/next.js",
    "microsoft/vscode",
  ];

  return (
    <section className="w-full py-20 relative z-10">
      {/* FORCE CENTER WRAPPER */}
      <div className="w-full flex flex-col items-center justify-center">
        <div className="w-full max-w-4xl px-6 mx-auto">
          {/* THE MAIN INPUT */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="relative w-full"
          >
            {/* Massive glow background when focused */}
            <motion.div
              className="absolute -inset-6 rounded-[3rem] bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 blur-3xl"
              style={{ opacity: glowOpacitySpring }}
            />
            
            {/* Always visible subtle glow */}
            <div className="absolute -inset-3 rounded-[2.5rem] bg-gradient-to-r from-purple-500/30 via-blue-500/30 to-cyan-500/30 blur-2xl" />
            
            {/* Outer container with gradient border */}
            <motion.div
              className={`
                relative rounded-[2rem] p-[2px] transition-all duration-500
                ${isFocused 
                  ? "bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500" 
                  : "bg-gradient-to-r from-purple-500/50 via-blue-500/50 to-cyan-500/50"}
              `}
              animate={{
                boxShadow: isFocused 
                  ? "0 0 100px rgba(168, 85, 247, 0.4), 0 0 150px rgba(59, 130, 246, 0.3)"
                  : "0 0 40px rgba(168, 85, 247, 0.2), 0 0 60px rgba(59, 130, 246, 0.15)",
              }}
            >
              {/* Inner container */}
              <div className="relative rounded-[calc(2rem-2px)] bg-[#030014]/95 backdrop-blur-xl p-4 sm:p-5">
                <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 p-4 sm:p-5">
                  {/* GitHub icon - Always prominent */}
                  <motion.div
                    className={`
                      flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center
                      transition-all duration-300
                      ${isFocused 
                        ? "bg-gradient-to-br from-purple-500 to-blue-500 shadow-[0_0_30px_rgba(168,85,247,0.5)]" 
                        : "bg-gradient-to-br from-purple-500/80 to-blue-500/80"
                      }
                    `}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Github className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                  </motion.div>

                  {/* Input field */}
                  <div className="flex-1 relative w-full">
                    <input
                      type="text"
                      value={url}
                      onChange={(e) => {
                        setUrl(e.target.value);
                        setError("");
                      }}
                      onFocus={() => setIsFocused(true)}
                      onBlur={() => setIsFocused(false)}
                      onKeyDown={handleKeyDown}
                      placeholder="github.com/owner/repository"
                      className="w-full bg-transparent text-white text-xl sm:text-2xl placeholder-white/30 outline-none font-medium text-center sm:text-left"
                      disabled={loading}
                    />
                    
                    {/* Valid indicator */}
                    <AnimatePresence>
                      {isValid && url && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0 }}
                          className="absolute right-0 top-1/2 -translate-y-1/2 hidden sm:block"
                        >
                          <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                            <motion.div
                              className="w-3 h-3 rounded-full bg-green-400"
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ duration: 1, repeat: Infinity }}
                            />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* THE ACTION BUTTON - BIG and PROMINENT */}
                  <AnimatedButton
                    onClick={handleSubmit}
                    loading={loading}
                    size="lg"
                    className="w-full sm:w-auto flex-shrink-0"
                    icon={loading ? undefined : <ArrowRight className="w-5 h-5" />}
                  >
                    {loading ? "Analyzing" : "Analyze"}
                  </AnimatedButton>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Error message - CENTERED */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10, height: 0 }}
                animate={{ opacity: 1, y: 0, height: "auto" }}
                exit={{ opacity: 0, y: -10, height: 0 }}
                className="w-full flex justify-center mt-8"
              >
                <div className="flex items-center gap-2 px-6 py-4 rounded-2xl bg-red-500/10 border border-red-500/20">
                  <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                  <span className="text-red-400 text-sm font-medium">{error}</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Suggestions - CENTERED */}
          <motion.div
            className="w-full flex flex-wrap items-center justify-center gap-4 mt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <span className="text-white/30 text-sm flex items-center gap-2">
              <Search className="w-4 h-4" />
              Try these:
            </span>
            {suggestions.map((suggestion, index) => (
              <motion.button
                key={suggestion}
                onClick={() => setUrl(`github.com/${suggestion}`)}
                className="px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white/50 text-sm font-mono
                           hover:bg-white/10 hover:text-white/70 hover:border-white/20 transition-all duration-300"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                {suggestion}
              </motion.button>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ==================== FEATURES SECTION - FORCE CENTERED ====================
function FeaturesSection() {
  const features = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Get comprehensive insights in under 30 seconds. No setup required.",
      gradient: "from-yellow-400 to-orange-500",
      shadowColor: "rgba(251, 146, 60, 0.4)"
    },
    {
      icon: Sparkles,
      title: "AI-Powered",
      description: "Gemini AI analyzes your code structure, patterns, and best practices.",
      gradient: "from-purple-400 to-pink-500",
      shadowColor: "rgba(168, 85, 247, 0.4)"
    },
    {
      icon: Target,
      title: "Actionable Roadmap",
      description: "Clear, prioritized steps to improve your repository quality.",
      gradient: "from-cyan-400 to-blue-500",
      shadowColor: "rgba(34, 211, 238, 0.4)"
    },
  ];

  return (
    <section className="w-full py-24 relative z-10">
      {/* FORCE CENTER - Full width flex container */}
      <div className="w-full flex flex-col items-center justify-center">
        {/* Content container with strict centering */}
        <div className="w-full max-w-6xl px-6 mx-auto flex flex-col items-center">
          
          {/* Section Header - CENTERED */}
          <motion.div
            className="w-full text-center mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Why <span className="text-gradient">RepoLens</span>?
            </h2>
            {/* <p className="text-white/50 text-xl max-w-2xl mx-auto">
              Get instant, actionable insights about your repository's health and quality.
            </p> */}
          </motion.div>

          {/* Feature Cards - CENTERED GRID */}
          <div className="w-full max-w-5xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                  className="w-full max-w-sm"
                >
                  <GlassCard className="text-center h-full border-white/20" padding="xl" tilt>
                    {/* Icon */}
                    <motion.div
                      className={`w-24 h-24 mx-auto mb-10 rounded-3xl bg-gradient-to-br ${feature.gradient} p-[2px]`}
                      whileHover={{ scale: 1.15, rotate: 8 }}
                      transition={{ type: "spring", stiffness: 300, damping: 15 }}
                      style={{
                        boxShadow: `0 25px 50px -12px ${feature.shadowColor}`
                      }}
                    >
                      <div className="w-full h-full rounded-3xl bg-black/50 backdrop-blur-xl flex items-center justify-center">
                        <feature.icon className="w-12 h-12 text-white drop-shadow-lg" />
                      </div>
                    </motion.div>

                    <h3 className="text-2xl font-bold text-white mb-5">
                      {feature.title}
                    </h3>
                    <p className="text-white/50 text-lg leading-relaxed">
                      {feature.description}
                    </p>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ==================== FOOTER SECTION - FORCE CENTERED ====================
function FooterSection() {
  return (
    <footer className="relative border-t border-white/5 mt-20 w-full">
      {/* Gradient line at top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
      
      {/* FORCE CENTER - Full width flex container */}
      <div className="w-full flex flex-col items-center justify-center py-16">
        {/* Content container with strict centering */}
        <div className="w-full max-w-4xl px-6 mx-auto flex flex-col items-center">
          
          {/* Logo and Brand - CENTERED */}
          <motion.div
            className="flex items-center justify-center gap-4 mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center shadow-lg shadow-purple-500/30">
              <Code2 className="w-7 h-7 text-white" />
            </div>
            <span className="text-gradient font-bold text-3xl">RepoLens</span>
          </motion.div>

          {/* Creator Attribution - CENTERED */}
          <motion.div
            className="flex flex-col items-center text-center mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <p className="text-white/50 text-sm mb-4 flex items-center justify-center gap-2">
              Built with <Heart className="w-4 h-4 text-red-400 fill-red-400" /> by
            </p>
            <p className="text-white font-bold text-2xl mb-6">Omkar Parelkar</p>
            
            {/* Social Links - CENTERED */}
            <div className="flex items-center justify-center gap-4">
              <motion.a
                href="https://github.com/omkarparelkar"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-white/60 hover:text-white hover:border-white/20 hover:bg-white/10 transition-all"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Github className="w-5 h-5" />
                <span className="font-medium">GitHub</span>
              </motion.a>
              
              <motion.a
                href="https://www.linkedin.com/in/omkar-parelkar/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-white/60 hover:text-white hover:border-white/20 hover:bg-white/10 transition-all"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Linkedin className="w-5 h-5" />
                <span className="font-medium">LinkedIn</span>
              </motion.a>
            </div>
          </motion.div>

          {/* Tech Stack - CENTERED */}
          <motion.div
            className="flex items-center justify-center gap-3 text-white/30 text-sm mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <span>Built with</span>
            <span className="px-3 py-1.5 rounded-lg bg-white/5 text-white/50 font-mono text-xs border border-white/10">Next.js</span>
            <span>+</span>
            <span className="px-3 py-1.5 rounded-lg bg-white/5 text-white/50 font-mono text-xs border border-white/10">Gemini AI</span>
          </motion.div>

          {/* Copyright - CENTERED */}
          <motion.p
            className="text-white/20 text-sm text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            © {new Date().getFullYear()} RepoLens. All rights reserved.
          </motion.p>
        </div>
      </div>
    </footer>
  );
}

// ==================== MAIN PAGE COMPONENT ====================
export default function Home() {
  const [status, setStatus] = useState<AnalysisStatus>("idle");
  const [result, setResult] = useState<
    (AnalysisResult & { repoName: string; repoDescription: string }) | null
  >(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async (url: string) => {
    setStatus("fetching");
    setError(null);

    try {
      await new Promise((r) => setTimeout(r, 500));
      setStatus("analyzing");

      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ repoUrl: url }),
      });

      setStatus("generating");

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Analysis failed");
      }

      setStatus("complete");

      await new Promise((r) => setTimeout(r, 800));
      setResult(data);
      setStatus("idle");
    } catch (err) {
      console.error("Analysis error:", err);
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong");
      setTimeout(() => setStatus("idle"), 2000);
    }
  };

  const handleBack = () => {
    setResult(null);
    setError(null);
  };

  return (
    <main className="min-h-screen relative overflow-hidden bg-[#030014]">
      <ParticleBackground />

      <AnimatePresence mode="wait">
        {result ? (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <Dashboard result={result} onBack={handleBack} />
          </motion.div>
        ) : (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5 }}
            className="relative z-10"
          >
            {/* Hero Section */}
            <HeroSection />

            {/* URL Input Section - THE MAIN ACTION */}
            <UrlInputSection
              onAnalyze={handleAnalyze}
              loading={status !== "idle" && status !== "error"}
            />

            {/* Global Error display */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 20, scale: 0.95 }}
                  className="w-full flex justify-center px-6 pb-8"
                >
                  <div className="px-8 py-5 rounded-2xl bg-red-500/10 border border-red-500/20 backdrop-blur-xl max-w-lg">
                    <p className="text-red-400 text-center font-medium">{error}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Features Section */}
            <FeaturesSection />

            {/* Footer with Identity */}
            <FooterSection />
          </motion.div>
        )}
      </AnimatePresence>

      <LoadingOverlay
        isVisible={status !== "idle" && status !== "error" && !result}
        status={status}
      />
    </main>
  );
}