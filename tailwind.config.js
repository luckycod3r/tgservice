module.exports = {
  content: ['./src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        light: {
          primary: "#ffffff",
          secondary: "#000000",
          "base-100": "#ffffff", // Background
          "base-content": "#000000", // Text color
        },
        dark: {
          primary: "#ffffff",
          secondary: "#ffffff",
          "base-100": "#1f2937", // Background
          "base-content": "#ffffff", // Text color, теперь белый на тёмной теме
        },
      },
    ],
  },
};
