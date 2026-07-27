import type { NextConfig } from 'next'
const createNextIntlPlugin = require('next-intl/plugin')

const withNextIntl = createNextIntlPlugin('./src/i18n.ts')

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  }
}

module.exports = withNextIntl(nextConfig)
