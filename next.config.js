const chalk = require("chalk");

console.log(`${chalk.cyan("info")}  - Using astroturf-loader`);
console.log(`${chalk.cyan("info")}  - React StrictMode is enabled`);

module.exports = () => ({
  webpack: config => {
    config.module.rules.push({
      test: /\.js$/,
      use: ["astroturf/loader"]
    });

    return config;
  },
  trailingSlash: true,
  reactStrictMode: true,
  poweredByHeader: false,
  future: { webpack5: true }
});
