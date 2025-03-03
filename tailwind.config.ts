import type { Config } from "tailwindcss";
import { heroui } from "@heroui/react";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        colorPrimary: "#A68263",
        colorSecondary: "#BFA995",
        colorTertiary: "#F2F2F2",
        colorContrast: "#6E7366",
      },
    },
  },
  darkMode: "class",
  plugins: [
    heroui({
      addCommonColors: true,
      layout: {
        radius: {
          small: "3px", // rounded-small
          medium: "6px", // rounded-medium
          large: "10px", // rounded-large
        },
      },
      themes: {
        light: {
          // ...
          colors: {
            background: "#FFFFFF", // or DEFAULT
            foreground: "#11181C", // or 50 to 900 DEFAULT
            primary: {
              foreground: "#FFFFFF",
              DEFAULT: "#000000",
            },
          },
        },
        dark: {
          // ...
          colors: {
            background: "#000000", // or DEFAULT
            foreground: "#FFFFFF", // or 50 to 900 DEFAULT
            primary: {
              //... 50 to 900
              foreground: "#000000",
              DEFAULT: "#FFFFFF",
            },
          },
        },
        // ... custom themes
      },
    }),
  ],
} satisfies Config;
