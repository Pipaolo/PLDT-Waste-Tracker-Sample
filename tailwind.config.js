module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      "pt-scans": ["PT Scans", "sans-serif"],
      oswald: ["Oswald", "sans-serif"],
    },
    ripple: (theme) => ({
      colors: theme("colors"),
    }),
    extend: {
      colors: {
        "pldt-red": "#E72D2F",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    require("tailwindcss-elevation")(["responsive", "hover"]),
    require("tailwindcss-ripple")(),
    require("tailwindcss-animatecss")({
      classes: [
        "animate__animated",
        "animate__fadeIn",
        "animate__bounceIn",
        "animate__lightSpeedOut",
      ],

      variants: ["responsive", "hover", "reduced-motion"],
    }),
  ],
};
