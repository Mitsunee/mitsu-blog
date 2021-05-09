const plugins = ["postcss-nested", "postcss-theme-ui", "postcss-focus"];

module.exports = {
  plugins:
    process.env.NODE_ENV === "production"
      ? // postcss-present-env is only included for prod
        [
          ...plugins,
          [
            "postcss-preset-env",
            {
              autoprefixer: {
                flexbox: "no-2009"
              },
              stage: 3,
              features: {
                "custom-properties": false
              }
            }
          ]
        ]
      : plugins
};
