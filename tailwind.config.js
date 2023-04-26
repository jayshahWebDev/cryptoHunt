/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    fontFamily: {
      montserrat: ["Montserrat", "sans-serif"],
    },
    screens: {
      tablet: "768px",

      laptop: "1024px",
    },
    colors: {
      headerBg: "#14161a",
      white: "#ffffff",
      yellow: "#eebc1d",
      logo: "#ffd700",
      gray: "#606060",
      dropDown: "#424242",
      red: "#E21717",
      green: "#3DBE29",
      black: "#000000",
      darkBlack: "#16171a",
      lightGray: "#a9a9a9",
      modelColor: "#404040",
      blue: "#4285f4",
    },
    backgroundImage: {
      bannerImg: "url('/public/banner2.jpg')",
    },
  },
  plugins: [],
};
