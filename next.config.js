const withTM = require("next-transpile-modules")(["nanostores"]);
const chalk = require("chalk");

console.log(`${chalk.cyan("info")}  - Using astroturf-loader`);
console.log(`${chalk.cyan("info")}  - React StrictMode is enabled`);

module.exports = withTM({
  webpack: config => {
    config.module.rules.push({
      test: /\.js$/,
      use: [
        {
          loader: "astroturf/loader",
          options: {
            useAltLoader: true
          }
        }
      ]
    });

    return config;
  },
  trailingSlash: true,
  reactStrictMode: true,
  poweredByHeader: false
});
