import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      keyframes: {
        "go-left": {
          from: {width: "300px"},
          to: {width: "100px"}
        },
        "go-right": {
          from: {width: "100px"},
          to: {width: "300px"}
        },
      },
      animation: {
        "move-left": "go-left 1s ease-in-out both",
        "move-right": "go-right 1s ease-in-out both",
      }
    },
  },
  plugins: [],
};
export default config;
