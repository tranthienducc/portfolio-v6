import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

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
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        ".py-clamp": {
          paddingTop: "clamp(1.125rem, 1.0893rem + 0.1786vw, 1.25rem)",
          paddingBottom: "clamp(1.125rem, 1.0893rem + 0.1786vw, 1.25rem)",
        },
        ".py-space-md": {
          paddingTop: "clamp(1.6875rem,1.6339rem + 0.2679vi,1.875rem)",
          paddingBottom: "clamp(1.6875rem,1.6339rem + 0.2679vi,1.875rem)",
        },
        ".py-space-sm": {
          paddingTop: "clamp(1.125rem,1.0893rem + 0.1786vi,1.25rem)",
          paddingBottom: "clamp(1.125rem,1.0893rem + 0.1786vi,1.25rem)",
        },
        ".py-space-2xs": {
          paddingTop: "clamp(0.5625rem,0.5446rem + 0.0893vi,0.625rem)",
          paddingBottom: "clamp(0.5625rem,0.5446rem + 0.0893vi,0.625rem)",
        },
        ".py-space-3xs": {
          paddingTop: "clamp(0.3125rem,0.3125rem + 0vi,0.3125rem)",
          paddingBottom: "clamp(0.3125rem,0.3125rem + 0vi,0.3125rem)",
        },
        ".gap-x-space-xs": {
          columnGap: "clamp(0.875rem,0.8571rem + 0.0893vi,0.9375rem)",
        },
        ".gap-x-space-sm": {
          columnGap: "clamp(1.125rem,1.0893rem + 0.1786vi,1.25rem)",
        },
        ".gap-x-space-md": {
          columnGap: "clamp(1.6875rem,1.6339rem + 0.2679vi,1.875rem)",
        },
        ".gap-x-space-xl": {
          columnGap: "clamp(3.375rem,3.2679rem + 0.5357vi,3.75rem)",
        },
        ".gap-y-space-sm": {
          rowGap: "clamp(1.125rem,1.0893rem + 0.1786vi,1.25rem)",
        },
        ".gap-y-space-xl": {
          rowGap: "clamp(3.375rem,3.2679rem + 0.5357vi,3.75rem)",
        },
        ".gap-y-space-2xl": {
          rowGap: "clamp(4.5rem,4.3571rem + 0.7143vi,5rem)",
        },
        ".gap-y-space-lg": {
          rowGap: "clamp(2.25rem,2.1786rem + 0.3571vi,2.5rem)",
        },
        ".gap-x-fluid": {
          columnGap: "clamp(1rem,0.8571rem + 1.0143vi,3.5rem)",
        },
        ".text-heading-2": {
          fontSize: "clamp(1.9531rem,1.496rem + 2.2854vi,3.5529rem)",
        },
        ".text-heading-4": {
          fontSize: "clamp(1.25rem,1.0359rem + 1.0707vi,1.9995rem)",
        },
        ".grid-gap": {
          columnGap: "clamp(1rem,0.8571rem + 1.0143vi,3.5rem)",
        },
        ".pt-space-3xs": {
          paddingTop: "clamp(0.3125rem,0.3125rem + 0vi,0.3125rem)",
        },
        ".pt-space-sm": {
          paddingTop: "clamp(1.125rem,1.0893rem + 0.1786vi,1.25rem)",
        },
      });
    }),
  ],
} satisfies Config;
