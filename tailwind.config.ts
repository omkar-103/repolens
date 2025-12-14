import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#030014",
        surface: {
          DEFAULT: "rgba(255, 255, 255, 0.03)",
          light: "rgba(255, 255, 255, 0.06)",
          lighter: "rgba(255, 255, 255, 0.1)",
        },
        accent: {
          purple: "#a855f7",
          blue: "#3b82f6",
          cyan: "#06b6d4",
          pink: "#ec4899",
          green: "#10b981",
          orange: "#f97316",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Space Grotesk", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      boxShadow: {
        glow: "0 0 20px rgba(168, 85, 247, 0.4)",
        "glow-lg": "0 0 40px rgba(168, 85, 247, 0.5)",
        "glow-xl": "0 0 60px rgba(168, 85, 247, 0.6)",
        "glow-blue": "0 0 30px rgba(59, 130, 246, 0.5)",
        "glow-cyan": "0 0 30px rgba(6, 182, 212, 0.5)",
        "inner-glow": "inset 0 0 20px rgba(168, 85, 247, 0.2)",
        card: "0 8px 32px rgba(0, 0, 0, 0.4), 0 2px 8px rgba(0, 0, 0, 0.3)",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "bounce-slow": "bounce 3s infinite",
        morph: "morph 8s ease-in-out infinite",
        "gradient-x": "gradient-shift 8s ease infinite",
        float: "float 6s ease-in-out infinite",
        "float-slow": "float 10s ease-in-out infinite",
        shimmer: "shimmer 3s infinite",
        "spin-slow": "spin 20s linear infinite",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "gradient-mesh": "linear-gradient(135deg, #a855f7 0%, #3b82f6 50%, #06b6d4 100%)",
      },
      transitionTimingFunction: {
        "bounce-in": "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
        "smooth-out": "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
      },
    },
  },
  plugins: [],
};

export default config;