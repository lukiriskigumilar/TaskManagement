/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Lexend Deca', 'sans-serif'],
      },
      colors:{
          primaryColor: '#2E5077',
          secondaryColor: '#4DA1A9',
          tertiaryColor: '#79D7BE',
          quaternaryColor: '#F6F4F0',
          taskHighColor :'#FF9F9F',
          taskMediumColor:'#F3FFCC',
          taskLowColor:'#C0FDFF',
  

      }
    },
  },
  plugins: [],
}

