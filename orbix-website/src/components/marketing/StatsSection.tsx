'use client'

import { useTranslations } from 'next-intl'

const stats = [
  { value: '100+', label: 'Clients satisfaits', suffix: '' },
  { value: '50+',  label: 'Projets livrés',     suffix: '' },
  { value: '3',    label: 'Pays couverts',       suffix: '' },
  { value: '24/7', label: 'Support disponible',  suffix: '' },
]

export function StatsSection({ locale }: { locale: string }) {
  return (
    <section className="py-16 border-y border-surface-border bg-surface-raised/50">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <p className="font-display text-4xl md:text-5xl font-bold text-white mb-2">
                <span className="bg-gradient-to-r from-orbix-500 to-purple-400 bg-clip-text text-transparent">
                  {stat.value}
                </span>
                {stat.suffix}
              </p>
              <p className="text-sm text-text-muted">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
