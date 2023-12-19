/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
    './app.vue',
  ],
  safelist: [
    {
      pattern:
        /bg-(red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-400/,
    },
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('daisyui'),
    function ({ addUtilities }) {
      const newUtilities = {
        '.disable-scrollbars': {
          scrollbarWidth: 'none',
          '-ms-overflow-style': 'none',
          '&::-webkit-scrollbar': {
            width: '0px',
            background: 'transparent',
            display: 'none',
          },
          '& *::-webkit-scrollbar': {
            width: '0px',
            background: 'transparent',
            display: 'none',
          },
          '& *': {
            scrollbarWidth: 'none',
            '-ms-overflow-style': 'none',
          },
        },
        '.text-overflow-lines-4': {
          display: '-webkit-box',
          '-webkit-box-orient': 'vertical',
          '-webkit-line-clamp': '4',
          overflow: 'hidden',
        },
        '.text-overflow-lines-6': {
          display: '-webkit-box',
          '-webkit-box-orient': 'vertical',
          '-webkit-line-clamp': '6',
          overflow: 'hidden',
        },
      };
      addUtilities(newUtilities);
    },
  ],
  daisyui: {
    themes: [
      {
        winter: {
          ...require("daisyui/src/theming/themes")["winter"],
          primary: "#4285f4",
          "primary-content": "#ffffff",
        }
      }
    ],
  },
};
