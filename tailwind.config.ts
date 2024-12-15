import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      screens: {
        "2xl": "1920px",
      },
    },
    extend: {
      backgroundImage: {
        "hero-pattern": "url('/assets/images/bg-noise.png')",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        BiggerDisplay: "Bigger Display",
        ApproachTrial: "Approach Trial",
        Pangaia: "Pangaia",
      },
    },
  },
  plugins: [],
} satisfies Config;
