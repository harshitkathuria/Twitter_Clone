module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        black: {
          DEFAULT: "#0F1419",
          dark: "#000"
        },
        blue: {
          DEFAULT: "#1da1f2"
        },
        gray: {
          primary: "#d9d9d9",
          secondary: "#2f3336"
        }
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: [],
  important: true
};
