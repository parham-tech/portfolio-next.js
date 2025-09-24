import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        diagonal: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "50%": { transform: "translate(70px, 70px)" }, 
        },
      },
      animation: {
        diagonal: "diagonal 10s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
