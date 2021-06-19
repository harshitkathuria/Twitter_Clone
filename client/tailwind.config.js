module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        black: {
          DEFAULT: "0F1419"
        },
        blue: {
          DEFAULT: "#1da1f2"
        }
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
};
