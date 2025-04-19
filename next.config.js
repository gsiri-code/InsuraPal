/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  // Add webpack configuration to handle ThreeJS/3D libraries
  webpack: (config) => {
    config.externals = [...(config.externals || []), { canvas: "canvas" }];
    return config;
  },
  // Explicitly enable the App Router
  experimental: {
    appDir: true,
  },
};

module.exports = nextConfig;
