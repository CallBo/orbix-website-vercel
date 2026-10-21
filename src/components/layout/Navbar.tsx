'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { Menu, X } from 'lucide-react'

import { cn } from '@/lib/utils'
import { NAV_LINKS, ACADEMY_URL } from '@/lib/constants'
import { Button } from '@/components/ui/Button'
import { OrbixLogo } from './OrbixLogo'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        'fixed top-0 z-50 w-full transition-all duration-300 ease-apple',
        scrolled ? 'glass shadow-nav' : 'bg-transparent'
      )}
    >
      <nav className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <OrbixLogo className="h-7 w-auto" />
          <span className="font-display text-base font-semibold tracking-tight text-text-primary">
            Orbix <span className="text-orbix-600">Labs</span>
          </span>
        </Link>

        <div className="hidden items-center gap-7 md:flex">
          {NAV_LINKS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[13px] font-medium text-text-secondary transition-colors hover:text-text-primary"
            >
              {item.label}
            </Link>
          ))}
          <a
            href={ACADEMY_URL}
            className="text-[13px] font-medium text-text-secondary transition-colors hover:text-text-primary"
          >
            Academy
          </a>
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <SignedOut>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/auth/login">Connexion</Link>
            </Button>
            <Button variant="gradient" size="sm" asChild>
              <Link href="/auth/register">Get Started</Link>
            </Button>
          </SignedOut>
          <SignedIn>
            <Button variant="secondary" size="sm" asChild>
              <Link href="/dashboard">Dashboard</Link>
            </Button>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </div>

        <button
          onClick={() => setMobileOpen((v) => !v)}
          className="text-text-secondary hover:text-text-primary md:hidden"
          aria-label={mobileOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {mobileOpen && (
        <div className="border-t border-surface-border bg-surface-base px-4 py-4 md:hidden">
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-text-secondary hover:bg-surface-overlay hover:text-text-primary"
              >
                {item.label}
              </Link>
            ))}
            <a
              href={ACADEMY_URL}
              className="rounded-lg px-3 py-2.5 text-sm font-medium text-text-secondary hover:bg-surface-overlay hover:text-text-primary"
            >
              Academy
            </a>
          </div>
          <div className="mt-4 flex flex-col gap-2">
            <SignedOut>
              <Button variant="secondary" asChild>
                <Link href="/auth/login">Connexion</Link>
              </Button>
              <Button variant="gradient" asChild>
                <Link href="/auth/register">Get Started</Link>
              </Button>
            </SignedOut>
            <SignedIn>
              <Button variant="secondary" asChild>
                <Link href="/dashboard">Dashboard</Link>
              </Button>
            </SignedIn>
          </div>
        </div>
      )}
    </header>
  )
}
