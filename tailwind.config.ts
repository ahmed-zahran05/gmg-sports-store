import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}", "./lib/**/*.{js,ts,jsx,tsx}"] ,
  theme: {
    extend: {
      colors: {
        // GMG Sports Premium Brand Palette
        gmg: {
          // Gold/Yellow - Primary accent
          gold: {
            50: "#FFFBF0",
            100: "#FEF5E0",
            200: "#FDE8B8",
            300: "#FCDAA0",
            400: "#FBC870",
            500: "#F4D03F",
            600: "#D4AF37",
            700: "#B8941F",
            800: "#9C7A18",
            900: "#6B5310"
          },
          // Black - Primary brand color
          black: {
            50: "#F8F8F8",
            100: "#F0F0F0",
            200: "#E0E0E0",
            300: "#C8C8C8",
            400: "#8B8B8B",
            500: "#3C3C3C",
            600: "#262626",
            700: "#1A1A1A",
            800: "#0F0F0F",
            900: "#000000"
          },
          // White - Clean background
          white: {
            50: "#FFFFFF",
            100: "#FAFAFA",
            200: "#F5F5F5",
            300: "#EEEEEE",
            400: "#E8E8E8"
          }
        },
        // Semantic colors
        brand: {
          primary: "#F4D03F",
          secondary: "#1A1A1A",
          accent: "#D4AF37",
          light: "#F5F5F5",
          dark: "#000000"
        }
      },
      typography: {
        DEFAULT: {
          css: {
            color: "#1A1A1A",
            a: {
              color: "#D4AF37",
              "&:hover": {
                color: "#F4D03F"
              }
            }
          }
        }
      },
      boxShadow: {
        premium: "0 20px 60px rgba(0, 0, 0, 0.15)",
        elevated: "0 10px 40px rgba(212, 175, 55, 0.1)",
        card: "0 4px 20px rgba(0, 0, 0, 0.08)"
      },
      animation: {
        shimmer: "shimmer 2s infinite",
        glow: "glow 2s ease-in-out infinite"
      },
      keyframes: {
        shimmer: {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "1" }
        },
        glow: {
          "0%, 100%": { "box-shadow": "0 0 10px rgba(244, 208, 63, 0.2)" },
          "50%": { "box-shadow": "0 0 20px rgba(244, 208, 63, 0.4)" }
        }
      }
    }
  },
  plugins: []
};

export default config;
