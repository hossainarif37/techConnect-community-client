import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			primary: '#031022',
  			secondary: '#122033',
  			accent: '#1D3453',
  			highlight: '#254369',
  			'light-gray': '#D9D9D9',
  			white: '#F3F3F3',
  			'gray-primary': '#EDEDED',
  			black: '#444444',
  			'blue-primary': '#00A3FF'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	},
  	screens: {
  		sm: '450px',
  		md: '768px',
  		lg: '1280px',
  		xl: '1440px'
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
