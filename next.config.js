const nextTranspileModules = require("next-transpile-modules");
const chalk = require("chalk");

const esModulePackages = [
  // nanostores:
  "nanostores",
  // unified, remark, rehype
  "unified",
  "remark-parse",
  "remark-unwrap-images",
  "remark-rehype",
  "rehype-slug",
  "rehype-external-links",
  "rehype-stringify",
  // dependencies of above
  "bail",
  "ccount",
  "character-entities",
  "comma-separated-tokens",
  "hast-util-has-property",
  "hast-util-heading-rank",
  "hast-util-is-element",
  "hast-util-to-html",
  "hast-util-to-string",
  "hast-util-whitespace",
  "html-void-elements",
  "is-absolute-url",
  "is-plain-obj",
  "mdast-util-definitions",
  "mdast-util-from-markdown",
  "mdast-util-to-hast",
  "mdast-util-to-string",
  "micromark",
  "parse-entities",
  "property-information",
  "space-separated-tokens",
  "stringify-entities",
  "trough",
  "unist-builder",
  "unist-util-generated",
  "unist-util-is",
  "unist-util-position",
  "unist-util-stringify-position",
  "unist-util-visit",
  "vfile"
];

const withTM = nextTranspileModules(esModulePackages);

console.log(`${chalk.cyan("info")}  - React StrictMode is enabled`);

module.exports = withTM({
  trailingSlash: true,
  reactStrictMode: true,
  poweredByHeader: false
});
