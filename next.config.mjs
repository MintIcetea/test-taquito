/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    config.externals.push("pino-pretty", "lokijs", "encoding");

    // Fixes npm packages that depend on `fs` module
    if (!isServer) {
      Object.assign(config.resolve.fallback, { fs: false });
    }

    return config;
  },
};

export default nextConfig;
