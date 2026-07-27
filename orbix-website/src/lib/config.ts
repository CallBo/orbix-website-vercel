export const config = {
  app: {
    url:  process.env.NEXT_PUBLIC_APP_URL  || 'http://localhost:3000',
    name: process.env.NEXT_PUBLIC_APP_NAME || 'Orbix Labs',
  },
  contact: {
    email:    process.env.NEXT_PUBLIC_EMAIL    || 'hello@orbixlabs.tech',
    location: process.env.NEXT_PUBLIC_LOCATION || 'Cotonou, Bénin',
    hours:    process.env.NEXT_PUBLIC_HOURS    || 'Lun–Ven : 8h–18h (GMT+1)',
    phone:    process.env.NEXT_PUBLIC_PHONE    || '',
  },
  socials: {
    linkedin:  process.env.NEXT_PUBLIC_LINKEDIN  || '#',
    twitter:   process.env.NEXT_PUBLIC_TWITTER   || '#',
    github:    process.env.NEXT_PUBLIC_GITHUB    || '#',
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM || '#',
    whatsapp:  process.env.NEXT_PUBLIC_WHATSAPP  || '#',
    facebook:  process.env.NEXT_PUBLIC_FACEBOOK  || '#',
  },
  urls: {
    academy: process.env.NEXT_PUBLIC_ACADEMY_URL || 'https://academy.orbixlabs.tech',
    api:     process.env.NEXT_PUBLIC_API_URL     || 'http://localhost:8080',
  },
}
