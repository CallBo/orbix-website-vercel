'use client'

import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'
import { config } from '@/lib/config'

export function HeroSection({ locale }: { locale: string }) {
  const t = useTranslations('hero')
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 md:px-6 overflow-hidden">

      {/* Background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-orbix-500/10 blur-[120px]" />
        <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] rounded-full bg-purple-500/5 blur-[80px]" />
        <div className="absolute top-1/3 right-1/4 w-[300px] h-[300px] rounded-full bg-cyan-400/5 blur-[80px]" />
      </div>

      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(#7b30ff 1px, transparent 1px), linear-gradient(90deg, #7b30ff 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }}
      />

      <div className={`relative z-10 text-center max-w-5xl mx-auto transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>

        {/* Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-orbix-500/30 bg-orbix-500/10 px-4 py-2 text-sm text-orbix-400 mb-8">
          <span className="h-2 w-2 rounded-full bg-orbix-500 animate-pulse" />
          Engineering Tomorrow. — Cotonou, Bénin 🇧🇯
        </div>

        {/* Orbe animé */}
        <div className="relative mx-auto w-32 h-32 mb-10">
          {/* Anneau extérieur */}
          <div className="absolute inset-0 rounded-full border-2 border-orbix-500/30 animate-spin" style={{ animationDuration: '8s' }} />
          {/* Anneau milieu */}
          <div className="absolute inset-3 rounded-full border border-orbix-500/50 animate-spin" style={{ animationDuration: '5s', animationDirection: 'reverse' }} />
          {/* Sphère centrale */}
          <div className="absolute inset-6 rounded-full bg-gradient-to-br from-orbix-500 to-purple-600 shadow-glow-purple flex items-center justify-center">
            <span className="text-white font-display font-bold text-xl">O</span>
          </div>
          {/* Point orbital */}
          <div className="absolute top-1 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-white shadow-lg animate-spin" style={{ animationDuration: '8s', transformOrigin: '0 63px' }} />
        </div>

        {/* Titre */}
        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight leading-none mb-6">
          Engineering{' '}
          <span className="inline-block bg-gradient-to-r from-orbix-500 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
            Tomorrow.
          </span>
        </h1>

        {/* Sous-titre */}
        <p className="font-body text-lg md:text-xl text-text-secondary leading-relaxed max-w-2xl mx-auto mb-4">
          {t('subtitle')}
        </p>

        <p className="font-body text-sm text-text-muted max-w-xl mx-auto mb-10">
          {t('description')}
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <a
            href={`/${locale}/auth/register`}
            className="inline-flex items-center justify-center rounded-xl bg-orbix-500 px-8 py-4 text-base font-semibold text-white hover:bg-orbix-600 transition-all duration-200 hover:shadow-glow-purple hover:scale-105 active:scale-95"
          >
            {t('cta_primary')}
          </a>
          <a
            href={`/${locale}/services`}
            className="inline-flex items-center justify-center rounded-xl border border-surface-border bg-surface-raised px-8 py-4 text-base font-semibold text-text-secondary hover:text-white hover:border-orbix-500/50 transition-all duration-200"
          >
            {t('cta_secondary')}
          </a>
        </div>

        {/* Trusted by */}
        <p className="text-xs text-text-muted">
          {t('trusted')}
        </p>

      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-surface-border flex items-start justify-center p-1">
          <div className="w-1.5 h-3 rounded-full bg-orbix-500 animate-pulse" />
        </div>
      </div>

    </section>
  )
}
