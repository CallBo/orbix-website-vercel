'use client'

import { useState, useEffect } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { useRouter, usePathname } from 'next/navigation'
import { Menu, X, ChevronDown, Check } from 'lucide-react'
import { config } from '@/lib/config'

const languages = [
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'en', label: 'English',  flag: '🇬🇧' },
  { code: 'pt', label: 'Português', flag: '🇵🇹' },
]

export function Navbar() {
  const t = useTranslations('nav')
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const switchLocale = (newLocale: string) => {
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`)
    document.cookie = `orbix_locale=${newLocale};path=/;max-age=31536000`
    router.push(newPath)
    setLangOpen(false)
  }

  const current = languages.find(l => l.code === locale) || languages[0]

  const navLinks = [
    { label: t('solutions'), href: `/${locale}/services` },
    { label: t('products'),  href: `/${locale}/products` },
    { label: t('academy'),   href: config.urls.academy },
    { label: t('about'),     href: `/${locale}/about` },
    { label: t('blog'),      href: `/${locale}/blog` },
    { label: t('contact'),   href: `/${locale}/contact` },
  ]

  return (
    <header className={`fixed top-0 z-50 w-full transition-all duration-300 ${
      scrolled
        ? 'border-b border-surface-border bg-surface-base/90 backdrop-blur-lg'
        : 'bg-transparent'
    }`}>
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6">

        {/* Logo */}
        <a href={`/${locale}`} className="flex items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/orbix-logo-horizontal.png"
            alt="Orbix Labs"
            className="h-9 w-auto object-contain"
          />
        </a>

        {/* Nav links — desktop */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map(link => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-text-secondary hover:text-white transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Actions — desktop */}
        <div className="hidden md:flex items-center gap-3">

          {/* Sélecteur de langue */}
          <div className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-2 rounded-lg border border-surface-border bg-surface-raised px-3 py-2 text-sm text-text-secondary hover:text-white hover:border-orbix-500/50 transition-all"
            >
              <span>{current.flag}</span>
              <span>{current.code.toUpperCase()}</span>
              <ChevronDown className="h-3 w-3" />
            </button>

            {langOpen && (
              <div className="absolute right-0 top-full mt-2 w-40 rounded-xl border border-surface-border bg-surface-raised shadow-lg overflow-hidden z-50">
                {languages.map(lang => (
                  <button
                    key={lang.code}
                    onClick={() => switchLocale(lang.code)}
                    className={`flex w-full items-center gap-3 px-4 py-3 text-sm transition-colors ${
                      locale === lang.code
                        ? 'bg-orbix-500/10 text-orbix-400'
                        : 'text-text-secondary hover:bg-surface-overlay hover:text-white'
                    }`}
                  >
                    <span>{lang.flag}</span>
                    <span>{lang.label}</span>
                    {locale === lang.code && <Check className="ml-auto h-3 w-3" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Connexion */}
          <a
            href={`/${locale}/auth/login`}
            className="text-sm font-medium text-text-secondary hover:text-white transition-colors px-3 py-2"
          >
            {t('signin')}
          </a>

          {/* Get Started */}
          <a
            href={`/${locale}/auth/register`}
            className="inline-flex items-center justify-center rounded-xl bg-orbix-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-orbix-600 transition-all duration-200 hover:shadow-glow-purple"
          >
            {t('getstarted')} →
          </a>
        </div>

        {/* Bouton menu mobile */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden rounded-lg p-2 text-text-secondary hover:text-white hover:bg-surface-overlay transition-colors"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Menu mobile */}
      {mobileOpen && (
        <div className="md:hidden border-t border-surface-border bg-surface-base/95 backdrop-blur-lg">
          <div className="px-4 py-4 space-y-1">

            <div className="flex justify-center pb-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/orbix-symbol.png"
                alt="Orbix Labs"
                className="h-10 w-auto"
              />
            </div>

            {navLinks.map(link => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block rounded-xl px-4 py-3 text-sm font-medium text-text-secondary hover:bg-surface-overlay hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}

            <div className="pt-4 border-t border-surface-border space-y-2">
              <div className="flex gap-2 px-2">
                {languages.map(lang => (
                  <button
                    key={lang.code}
                    onClick={() => switchLocale(lang.code)}
                    className={`flex-1 rounded-lg py-2 text-xs font-medium transition-colors ${
                      locale === lang.code
                        ? 'bg-orbix-500/15 text-orbix-400 border border-orbix-500/30'
                        : 'text-text-muted hover:text-white border border-surface-border'
                    }`}
                  >
                    {lang.flag} {lang.code.toUpperCase()}
                  </button>
                ))}
              </div>

              <a
                href={`/${locale}/auth/login`}
                className="block rounded-xl border border-surface-border px-4 py-3 text-center text-sm font-medium text-text-secondary hover:text-white transition-colors"
              >
                {t('signin')}
              </a>
              <a
                href={`/${locale}/auth/register`}
                className="block rounded-xl bg-orbix-500 px-4 py-3 text-center text-sm font-semibold text-white hover:bg-orbix-600 transition-colors"
              >
                {t('getstarted')} →
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
