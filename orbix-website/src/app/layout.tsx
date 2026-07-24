import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Orbix Labs',
  description: 'Engineering Tomorrow.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
