/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("daisyui"),
    function ({ addUtilities }) {
      const newUtilities = {
        ".disable-scrollbars": {
          scrollbarWidth: "none",
          "-ms-overflow-style": "none",
          "&::-webkit-scrollbar": {
            width: "0px",
            background: "transparent",
            display: "none"
          },
          "& *::-webkit-scrollbar": {
            width: "0px",
            background: "transparent",
            display: "none"
          },
          "& *": {
            scrollbarWidth: "none",
            "-ms-overflow-style": "none"
          }
        }
      };
      addUtilities(newUtilities);
    },
  ],
}

