import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#faf5ff",
          100: "#f3e8ff",
          200: "#e9d5ff",
          300: "#d8b4fe",
          400: "#c084fc",
          500: "#a855f7",
          600: "#9333ea",
          700: "#7e22ce",
          800: "#6b21a8",
          900: "#581c87",
        },
        gold: {
          400: "#facc15",
          500: "#eab308",
        },
      },
      backgroundImage: {
        "brand-gradient": "linear-gradient(135deg, #a855f7 0%, #6366f1 50%, #ec4899 100%)",
        "brand-radial": "radial-gradient(circle at 50% 0%, rgba(168,85,247,0.25), transparent 60%)",
      },
      boxShadow: {
        glow: "0 0 40px rgba(168, 85, 247, 0.35)",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "float-slow": "float 10s ease-in-out infinite",
        shimmer: "shimmer 2.5s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-18px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-700px 0" },
          "100%": { backgroundPosition: "700px 0" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
