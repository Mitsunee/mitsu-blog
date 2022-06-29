const restrictedGlobals = require("confusing-browser-globals");

module.exports = {
  parserOptions: { sourceType: "module" },
  extends: [
    "eslint:recommended",
    "foxkit",
    "foxkit/react",
    "foxkit/ts",
    "next",
    "prettier"
  ],
  rules: {
    "no-restricted-globals": ["error"].concat(restrictedGlobals),
    "@next/next/no-img-element": "off"
  },
  overrides: [
    {
      files: ["**/*.ts", "**/*.tsx"],
      rules: {
        "no-undef": "off"
      }
    }
  ]
};
