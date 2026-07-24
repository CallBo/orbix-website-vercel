import type { NextConfig } from 'next'
const createNextIntlPlugin = require('next-intl/plugin')

const withNextIntl = createNextIntlPlugin('./src/i18n.ts')

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**.orbixlabs.tech' }
    ]
  }
}

module.exports = withNextIntl(nextConfig)
