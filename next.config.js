/**
 * @type {import('next').NextConfig}
 */

const nextConfig = {
  productionBrowserSourceMaps: false,
  swcMinify: true,

  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },

  async redirects() {
    return [];
  },
};

module.exports = nextConfig;
