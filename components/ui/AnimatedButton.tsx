"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ReactNode, ButtonHTMLAttributes } from "react";

interface AnimatedButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  icon?: ReactNode;
}

export function AnimatedButton({
  children,
  variant = "primary",
  size = "md",
  loading = false,
  icon,
  className,
  disabled,
  ...props
}: AnimatedButtonProps) {
  const variants = {
    primary: `
      relative overflow-hidden
      bg-gradient-to-r from-accent-purple via-accent-blue to-accent-cyan
      text-white font-semibold
      shadow-glow hover:shadow-glow-lg
      before:absolute before:inset-0
      before:bg-gradient-to-r before:from-accent-cyan before:via-accent-blue before:to-accent-purple
      before:opacity-0 before:transition-opacity before:duration-500
      hover:before:opacity-100
    `,
    secondary: `
      relative overflow-hidden
      bg-white/5 border border-white/10
      text-white font-medium
      hover:bg-white/10 hover:border-white/20
      hover:shadow-[0_0_20px_rgba(168,85,247,0.2)]
    `,
    ghost: `
      text-white/70 font-medium
      hover:text-white hover:bg-white/5
      transition-colors
    `,
    outline: `
      relative overflow-hidden
      bg-transparent border border-accent-purple/50
      text-accent-purple font-medium
      hover:bg-accent-purple/10 hover:border-accent-purple
      hover:shadow-glow
    `,
  };

  const sizes = {
    sm: "px-4 py-2 text-sm rounded-xl gap-2",
    md: "px-6 py-3 text-base rounded-xl gap-2",
    lg: "px-8 py-4 text-lg rounded-2xl gap-3",
  };

  return (
    <motion.button
      className={cn(
        "relative inline-flex items-center justify-center transition-all duration-300",
        "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100",
        variants[variant],
        sizes[size],
        className
      )}
      whileHover={{ scale: disabled || loading ? 1 : 1.05 }}
      whileTap={{ scale: disabled || loading ? 1 : 0.95 }}
      disabled={disabled || loading}
      {...props}
    >
      {/* Button content */}
      <span className="relative z-10 flex items-center gap-2">
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
      </span>

      {/* Ripple effect on hover for primary */}
      {variant === "primary" && !loading && (
        <motion.span
          className="absolute inset-0 z-0"
          initial={false}
          whileHover={{
            background: [
              "radial-gradient(circle at 50% 50%, rgba(255,255,255,0) 0%, rgba(255,255,255,0) 100%)",
              "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)",
            ],
          }}
          transition={{ duration: 0.5 }}
        />
      )}
    </motion.button>
  );
}