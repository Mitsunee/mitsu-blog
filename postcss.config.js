console.log("using postcss");

module.exports = {
  plugins: {
    "@csstools/postcss-global-data": {
      files: ["styles/media.css"]
    },
    "postcss-preset-env": {
      autoprefixer: { flexbox: "no-2009" },
      stage: 2,
      features: {
        "custom-properties": false,
        "custom-media-queries": true,
        "nesting-rules": true
      }
    }
  }
};
