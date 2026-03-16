import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "bg-primary": "var(--bg-primary)",
        "bg-secondary": "var(--bg-secondary)",
        "bg-card": "var(--bg-card)",
        "text-primary": "var(--text-primary)",
        "text-secondary": "var(--text-secondary)",
        "text-muted": "var(--text-muted)",
        "accent-cyan": "var(--accent-cyan)",
        "accent-amber": "var(--accent-amber)",
      },
      fontFamily: {
        mono: ["var(--font-jetbrains-mono)", "JetBrains Mono", "Fira Code", "monospace"],
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
      },
      animation: {
        "glow": "glow 2.5s ease-in-out infinite",
        "float": "float 4s ease-in-out infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "draw-line": "draw-line 1s ease-out forwards",
        "spin-slow": "spin-slow 6s linear infinite",
        "cursor-blink": "cursor-blink 1s step-end infinite",
      },
      keyframes: {
        glow: {
          "0%, 100%": { boxShadow: "0 0 12px rgba(0, 229, 255, 0.15)" },
          "50%": { boxShadow: "0 0 28px rgba(0, 229, 255, 0.4)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.8", boxShadow: "0 0 8px #00e5ff, 0 0 16px rgba(0, 229, 255, 0.15)" },
          "50%": { opacity: "1", boxShadow: "0 0 20px #00e5ff, 0 0 40px rgba(0, 229, 255, 0.3)" },
        },
        "draw-line": {
          from: { transform: "scaleY(0)" },
          to: { transform: "scaleY(1)" },
        },
        "spin-slow": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        "cursor-blink": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
      },
      backdropBlur: {
        glass: "12px",
      },
    },
  },
  plugins: [],
}

export default config
