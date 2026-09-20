import Link from 'next/link'
import { Github, Linkedin, Twitter, Instagram } from 'lucide-react'

import { Container } from './Container'
import { OrbixLogo } from './OrbixLogo'

const footerLinks = [
  { label: 'Services', href: '/services' },
  { label: 'Tarifs', href: '/pricing' },
  { label: 'Blog', href: '/blog' },
  { label: 'À propos', href: '/about' },
  { label: 'Contact', href: '/contact' },
  { label: 'Mentions légales', href: '/legal' },
]

const socials = [
  { label: 'LinkedIn', href: 'https://linkedin.com/company/orbixlabs', icon: Linkedin },
  { label: 'Twitter', href: 'https://twitter.com/orbixlabs', icon: Twitter },
  { label: 'Instagram', href: 'https://instagram.com/orbixlabs', icon: Instagram },
  { label: 'GitHub', href: 'https://github.com/OrbixLabs', icon: Github },
]

export function Footer() {
  return (
    <footer className="border-t border-surface-border bg-surface-base">
      <Container className="py-16">
        <div className="flex flex-col gap-12 md:flex-row md:justify-between">
          <div className="max-w-xs">
            <Link href="/" className="flex items-center gap-2.5">
              <OrbixLogo className="h-7 w-auto" />
              <span className="font-display text-base font-bold text-white">
                Orbix <span className="text-orbix-400">Labs</span>
              </span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-text-muted">
              Nous concevons, développons et hébergeons les outils numériques dont les
              entreprises africaines ont besoin pour grandir.
            </p>
          </div>

          <div className="flex gap-16">
            <div>
              <p className="text-sm font-medium text-white">Navigation</p>
              <ul className="mt-4 space-y-3">
                {footerLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-text-muted transition-colors hover:text-white">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-sm font-medium text-white">Contact</p>
              <ul className="mt-4 space-y-3 text-sm text-text-muted">
                <li>
                  <a href="mailto:hello@orbixlabs.tech" className="transition-colors hover:text-white">
                    hello@orbixlabs.tech
                  </a>
                </li>
                <li>Cotonou, Bénin</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col-reverse items-center justify-between gap-6 border-t border-surface-border pt-8 md:flex-row">
          <p className="text-xs text-text-muted">© {new Date().getFullYear()} Orbix Labs. Tous droits réservés.</p>
          <div className="flex items-center gap-4">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                target="_blank"
                rel="noreferrer"
                className="text-text-muted transition-colors hover:text-orbix-400"
              >
                <social.icon className="h-4.5 w-4.5" />
              </a>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  )
}
