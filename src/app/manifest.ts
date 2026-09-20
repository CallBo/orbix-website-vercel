import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Orbix Labs',
    short_name: 'Orbix',
    description: 'La plateforme technologique pensée pour les entreprises africaines.',
    start_url: '/dashboard',
    display: 'standalone',
    background_color: '#0a0a0f',
    theme_color: '#7b30ff',
    orientation: 'portrait',
    icons: [
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
      { src: '/icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  }
}
