/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
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

    // container: {
    //   center: true,
    //   // padding: '2rem', // Adjust the padding according to your needs
    //   maxWidth: '1920px',
    //   // margin: 'auto',
    //   // lg: {
    //   //   paddingLeft: '20rem', // 80px equivalent to 20rem (80px / 4)
    //   //   paddingRight: '20rem', // 80px equivalent to 20rem (80px / 4)
    //   // },
    // },
  },
  plugins: [],
}