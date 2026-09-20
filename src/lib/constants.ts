export const SITE_NAME = 'Orbix Labs'

export const NAV_LINKS = [
  { label: 'Services', href: '/services' },
  { label: 'Tarifs', href: '/pricing' },
  { label: 'À propos', href: '/about' },
] as const

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://orbixlabs.tech'
export const ACADEMY_URL = process.env.NEXT_PUBLIC_ACADEMY_URL ?? 'https://academy.orbixlabs.tech'
export const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'https://api.orbixlabs.tech'
