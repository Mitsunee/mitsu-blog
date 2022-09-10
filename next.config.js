/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true
  },
  async redirects() {
    return [
      {
        source: `/category/:slug`,
        destination: `/category/:slug/1`,
        permanent: false
      },
      {
        source: `/posts/`,
        destination: `/posts/1`,
        permanent: false
      }
    ];
  }
};

module.exports = nextConfig;
