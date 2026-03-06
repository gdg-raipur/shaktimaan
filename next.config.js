/** @type {import('next').NextConfig} */
const nextConfig = {
  // We need this so pdfjs-dist works correctly in the browser
  webpack: (config) => {
    config.resolve.alias.canvas = false;
    return config;
  },
};

module.exports = nextConfig;
