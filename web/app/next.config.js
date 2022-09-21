/** @type {import('next').NextConfig} */

const withPWA = require('next-pwa')({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
})

module.exports = withPWA({
  trailingSlash: true,
  reactStrictMode: true,
  publicRuntimeConfig: {
    ENV_API_URL: process.env.ENV_API_URL,
  },
  images: {
    // loader: "custom",
    // imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    domains: ['lh3.googleusercontent.com', 'avatars.githubusercontent.com', 'images.unsplash.com'],
    // nextImageExportOptimizer: {
    //   imageFolderPath: "public/images",
    //   exportFolderPath: "out",
    //   quality: 75,
    // },
    unoptimized: true,
  },
  env: {
    storePicturesInWEBP: true,
  }
})
