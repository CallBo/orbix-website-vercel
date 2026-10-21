'use client'

import { useState } from 'react'
import Link from 'next/link'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { Menu, X } from 'lucide-react'

import { NAV_LINKS, ACADEMY_URL } from '@/lib/constants'
import { OrbixLogo, OrbixWordmark } from './OrbixLogo'

// Barre de navigation façon apple.com : fine, sombre et translucide en
// permanence (verre dépoli noir), texte gris clair. Lisible aussi bien
// au-dessus du Hero noir que des sections blanches — contrairement à une
// nav transparente qui doit deviner la couleur du fond derrière elle.
const linkClass = 'text-[12px] font-normal text-white/75 transition-colors duration-200 hover:text-white'

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="glass-dark fixed top-0 z-50 w-full !border-x-0 !border-t-0 border-b border-white/[0.06]">
      <nav className="mx-auto flex h-12 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2" aria-label="Orbix Labs — accueil">
          <OrbixLogo variant="mono" className="h-[30px]" />
          <OrbixWordmark variant="mono" className="h-[24px]" />
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((item) => (
            <Link key={item.href} href={item.href} className={linkClass}>
              {item.label}
            </Link>
          ))}
          <a href={ACADEMY_URL} className={linkClass}>
            Academy
          </a>
        </div>

        <div className="hidden items-center gap-5 md:flex">
          <SignedOut>
            <Link href="/auth/login" className={linkClass}>
              Connexion
            </Link>
            <Link
              href="/auth/register"
              className="rounded-full bg-white px-3.5 py-1 text-[12px] font-medium text-ink-900 transition-colors hover:bg-white/85"
            >
              Commencer
            </Link>
          </SignedOut>
          <SignedIn>
            <Link href="/dashboard" className={linkClass}>
              Dashboard
            </Link>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </div>

        <button
          onClick={() => setMobileOpen((v) => !v)}
          className="text-white/80 hover:text-white md:hidden"
          aria-label={mobileOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {mobileOpen && (
        <div className="border-t border-white/[0.06] bg-ink-800/95 px-6 pb-8 pt-4 backdrop-blur-xl md:hidden">
          <div className="flex flex-col">
            {NAV_LINKS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="border-b border-white/[0.06] py-3.5 font-display text-2xl font-semibold tracking-tight text-white"
              >
                {item.label}
              </Link>
            ))}
            <a
              href={ACADEMY_URL}
              className="border-b border-white/[0.06] py-3.5 font-display text-2xl font-semibold tracking-tight text-white"
            >
              Academy
            </a>
          </div>
          <div className="mt-6 flex flex-col gap-3">
            <SignedOut>
              <Link
                href="/auth/register"
                className="rounded-full bg-white py-3 text-center text-sm font-medium text-ink-900"
              >
                Commencer
              </Link>
              <Link href="/auth/login" className="py-2 text-center text-sm text-white/75">
                Connexion
              </Link>
            </SignedOut>
            <SignedIn>
              <Link href="/dashboard" className="rounded-full bg-white py-3 text-center text-sm font-medium text-ink-900">
                Dashboard
              </Link>
            </SignedIn>
          </div>
        </div>
      )}
    </header>
  )
}
