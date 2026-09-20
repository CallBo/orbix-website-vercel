/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'files.orbixlabs.tech' },
      { protocol: 'https', hostname: 'img.clerk.com' },
    ],
  },
}

module.exports = nextConfig
