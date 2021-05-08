const LINK_PREFIX = process.env.NEXT_PUBLIC_LINK_PREFIX || "";

module.exports = () => ({
  reactStrictMode: true,
  poweredByHeader: false,
  basePath: LINK_PREFIX,
  future: { webpack5: true }
});
