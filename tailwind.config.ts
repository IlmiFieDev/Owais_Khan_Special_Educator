import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#142E3F",
          soft: "#2A4556",
          muted: "#5A7383",
        },
        teal: {
          DEFAULT: "#087D75",
          dark: "#06645E",
          soft: "#0A9A90",
          mist: "#DCEFE8",
        },
        ivory: "#FAF8F2",
        sage: "#DCEFE8",
        peach: {
          DEFAULT: "#F2BB96",
          soft: "#F8D9C4",
        },
        sky: "#E4ECFA",
        frost: "#FFFFFF",
        forest: "#142E3F",
        cream: "#FAF8F2",
        coral: "#E89A6E",
        yellow: "#F2BB96",
      },
      fontFamily: {
        heading: ["var(--font-fraunces)", "Georgia", "serif"],
        body: ["var(--font-manrope)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        card: "1.25rem",
        large: "1.75rem",
        xl2: "2rem",
        soft: "1.5rem",
      },
      boxShadow: {
        soft: "0 10px 30px rgba(20,46,63,.06)",
        glow: "0 0 40px rgba(8,125,117,.18)",
        "glow-peach": "0 0 36px rgba(242,187,150,.28)",
        glass: "0 12px 40px rgba(20,46,63,.08)",
        lift: "0 18px 48px rgba(20,46,63,.12)",
      },
      backgroundImage: {
        "mesh-hero":
          "radial-gradient(ellipse at 20% 20%, rgba(220,239,232,.9), transparent 50%), radial-gradient(ellipse at 80% 10%, rgba(228,236,250,.85), transparent 45%), radial-gradient(ellipse at 70% 80%, rgba(242,187,150,.35), transparent 50%), linear-gradient(160deg, #FAF8F2 0%, #F4F7F5 45%, #EAF3F0 100%)",
        "gradient-teal": "linear-gradient(135deg, #087D75 0%, #06645E 100%)",
      },
      keyframes: {
        "mesh-drift": {
          "0%, 100%": { transform: "translate(0,0) scale(1)" },
          "33%": { transform: "translate(2%, -1.5%) scale(1.03)" },
          "66%": { transform: "translate(-1.5%, 2%) scale(0.98)" },
        },
        "glow-pulse": {
          "0%, 100%": { opacity: "0.55" },
          "50%": { opacity: "0.9" },
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(18px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "mesh-drift": "mesh-drift 18s ease-in-out infinite",
        "glow-pulse": "glow-pulse 6s ease-in-out infinite",
        "fade-up": "fade-up .7s ease forwards",
      },
    },
  },
  plugins: [],
};

export default config;
