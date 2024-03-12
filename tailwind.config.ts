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
        'primary': '#3B82F6',
        'secondary': '#22D3EE',
        'accent': '#D9D9D9',
        'white-secondary': '#F3F3F3',
        'gray-secondary': '#EDEDED',
        'black-secondary': '#444',
      },
    },
    screens: {
      'sm': '450px',
      'md': '768px',
      'lg': '1280px',
      'xl': '1440px'
    }
  },
  plugins: [],
};
export default config;
