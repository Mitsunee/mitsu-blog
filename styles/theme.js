// see https://github.com/nelonoel/postcss-theme-ui#options for documentation

module.exports = {
  breakpoints: ["600px", "800px", "1200px"],
  colors: {
    primary: "#fffffd",
    accent: "#ff8833",
    red: "#ff3333"
  },
  fonts: {
    sans: '"Exo 2", sans-serif' // TODO import fonts in globals.css
    // TODO add title font
  },
  sizes: [
    "23.5%", // 4 col
    "32.5%", // 3 col
    "48.5%", // 2 col
    "98%" // 1 col
  ],
  space: [0] // TODO figure out common spacings?
};
