import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: { 950: "#0B0B12", 900: "#12121C", 800: "#1B1B29", 700: "#262637" },
        paper: { 50: "#FAFAFF", 100: "#F3F2FB" },
        brand: {
          50: "#F1EEFE", 100: "#E4DEFD", 200: "#C9BEFB", 300: "#A78CF8", 400: "#8B65F3",
          500: "#6D3FEE", 600: "#5A2FDB", 700: "#4823B0", 800: "#391C8A", 900: "#2B1568"
        },
        ok: "#16A34A",
        warn: "#D97706",
        danger: "#DC2626"
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"]
      },
      borderRadius: { xl2: "1.25rem" },
      boxShadow: {
        soft: "0 1px 2px rgba(16,12,40,0.04), 0 8px 24px -8px rgba(16,12,40,0.12)",
        card: "0 1px 1px rgba(16,12,40,0.03), 0 12px 32px -12px rgba(16,12,40,0.18)"
      },
      keyframes: {
        "fade-up": { "0%": { opacity: "0", transform: "translateY(8px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
        shimmer: { "0%": { backgroundPosition: "-200% 0" }, "100%": { backgroundPosition: "200% 0" } }
      },
      animation: { "fade-up": "fade-up 0.5s ease-out both", shimmer: "shimmer 1.6s linear infinite" }
    }
  },
  plugins: []
};

export default config;
