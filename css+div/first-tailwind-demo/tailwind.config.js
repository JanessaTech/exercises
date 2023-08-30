/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors : {
      primary : '#FF6363',
      secondary : {
        100: '#E2E2D5',
        200: '#888883'
      }
    },
    fontFamily: {
       janessa : ['Nunito', '']
    },
    extend: {},
  },
  plugins: [],
}

