/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {'NotoSans': ['Noto Sans TC', 'sans-serif'],},
    },

  },
  plugins: [
    require('tailwindcss-animated')
  ],
}