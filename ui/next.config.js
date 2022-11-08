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
    loader: "custom",
    domains: ['lh3.googleusercontent.com', 'avatars.githubusercontent.com', 'images.unsplash.com'],
  },
  env: {
    storePicturesInWEBP: true,
  }
})
