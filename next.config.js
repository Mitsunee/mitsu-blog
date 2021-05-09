module.exports = () => ({
  webpack: config => {
    config.module.rules.push({
      test: /\.js$/,
      use: ["astroturf/loader"]
    });

    return config;
  },
  reactStrictMode: true,
  poweredByHeader: false,
  future: { webpack5: true }
});
