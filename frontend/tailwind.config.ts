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
        greyBlack:"#1F1F1F",
        paleTan:"#F7F3F0",
        brightOrange:"#EA4F1B",
        mainRed:"#BF1A2F",
        tan:"#faf5eb",
      }
    },
  },
  plugins: [],
};
export default config;
