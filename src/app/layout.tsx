import type { Metadata, Viewport } from 'next'
import { Space_Grotesk, Inter, JetBrains_Mono } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import { Toaster } from 'sonner'

import './globals.css'
import { ServiceWorkerRegistration } from '@/components/ServiceWorkerRegistration'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['500', '600', '700'],
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['400', '500', '600'],
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '500'],
})

export const metadata: Metadata = {
  title: {
    default: 'Orbix Labs — Engineering Tomorrow.',
    template: '%s · Orbix Labs',
  },
  description: 'La plateforme technologique pensée pour les entreprises africaines.',
  metadataBase: new URL('https://orbixlabs.tech'),
  manifest: '/manifest.webmanifest',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Orbix Labs',
  },
  openGraph: {
    title: 'Orbix Labs — Engineering Tomorrow.',
    description: 'La plateforme technologique pensée pour les entreprises africaines.',
    url: 'https://orbixlabs.tech',
    siteName: 'Orbix Labs',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/og-image.jpg'],
  },
}

export const viewport: Viewport = {
  themeColor: '#0a0a0f',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="fr" className={`dark ${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}>
        <body className="font-body">
          {children}
          <Toaster theme="dark" position="top-center" />
          <ServiceWorkerRegistration />
        </body>
      </html>
    </ClerkProvider>
  )
}
