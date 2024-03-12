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
        primary: "#022533",
        secondary: "#3A4E55",
        accent: "#25F299",
        "primary-50": "#182237",
        "secondary-50": "#b7bac1",
        "white-50": "#F5F5F5"
      },
    },
  },
  plugins: [],
};
export default config;
