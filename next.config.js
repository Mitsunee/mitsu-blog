/** @type {import('next').NextConfig} */
const nextConfig = {
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
      }
    ];
  }
};

module.exports = nextConfig;
