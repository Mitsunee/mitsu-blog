// see https://github.com/nelonoel/postcss-theme-ui#options for documentation

module.exports = {
  breakpoints: ["500px", "800px", "1000px"],
  colors: {
    primary: "#fffffd",
    accent: "#ff8833",
    "accent-orange": "#ff8833",
    "accent-purple": "#8832ff",
    "accent-yellow": "#ffee32",
    "accent-pink": "#ff3277"
  },
  fonts: {
    sans: '"Exo 2", sans-serif'
    // TODO add title font
    // TODO add code font
  },
  sizes: [
    "23.5%", // 4 col
    "32.5%", // 3 col
    "48.5%", // 2 col
    "98%" // 1 col
  ],
  space: [0] // TODO figure out common spacings?
};
