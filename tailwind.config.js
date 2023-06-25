/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage:{
           'LandingImage':"url('./COMPONENTS/images/landingbg.jpeg')",
           "logo":"url('./COMPONENTS/images/logo.png')"
      },
      
    },
  },
  plugins: [],
}
