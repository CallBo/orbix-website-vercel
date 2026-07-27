'use client'

import { useTranslations } from 'next-intl'

export function CTASection({ locale }: { locale: string }) {
  return (
    <section className="py-24 px-4 md:px-6">
      <div className="mx-auto max-w-4xl">
        <div className="relative rounded-3xl border border-orbix-500/20 bg-gradient-to-br from-orbix-500/10 via-surface-raised to-purple-500/10 p-12 md:p-16 text-center overflow-hidden">

          {/* Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full bg-orbix-500/20 blur-[80px] pointer-events-none" />

          <div className="relative z-10">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
              Prêt à entrer dans{' '}
              <span className="bg-gradient-to-r from-orbix-500 to-cyan-400 bg-clip-text text-transparent">
                l'univers Orbix ?
              </span>
            </h2>
            <p className="text-text-secondary max-w-xl mx-auto mb-10">
              Créez votre compte gratuitement et commencez à construire votre présence numérique dès aujourd'hui.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={`/${locale}/auth/register`}
                className="inline-flex items-center justify-center rounded-xl bg-orbix-500 px-8 py-4 text-base font-semibold text-white hover:bg-orbix-600 transition-all duration-200 hover:shadow-glow-purple hover:scale-105"
              >
                Créer mon compte gratuitement →
              </a>
              <a
                href={`/${locale}/contact`}
                className="inline-flex items-center justify-center rounded-xl border border-surface-border px-8 py-4 text-base font-semibold text-text-secondary hover:text-white hover:border-orbix-500/50 transition-all duration-200"
              >
                Nous contacter
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
