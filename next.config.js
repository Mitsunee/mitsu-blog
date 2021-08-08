const withTM = require("next-transpile-modules")(["nanostores"]);
const chalk = require("chalk");

console.log(`${chalk.cyan("info")}  - React StrictMode is enabled`);

module.exports = withTM({
  trailingSlash: true,
  reactStrictMode: true,
  poweredByHeader: false
});
