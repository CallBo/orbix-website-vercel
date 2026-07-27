'use client'

import { useTranslations } from 'next-intl'
import { UserPlus, FileText, BarChart2, Download } from 'lucide-react'

export function HowItWorksSection({ locale }: { locale: string }) {
  const t = useTranslations('howitworks')

  const steps = [
    { icon: <UserPlus className="h-6 w-6" />, title: t('step1.title'), description: t('step1.description'), number: '01' },
    { icon: <FileText className="h-6 w-6" />, title: t('step2.title'), description: t('step2.description'), number: '02' },
    { icon: <BarChart2 className="h-6 w-6" />, title: t('step3.title'), description: t('step3.description'), number: '03' },
    { icon: <Download className="h-6 w-6" />, title: t('step4.title'), description: t('step4.description'), number: '04' },
  ]

  return (
    <section className="py-24 px-4 md:px-6 bg-surface-raised/30">
      <div className="mx-auto max-w-7xl">

        <div className="text-center mb-16">
          <p className="text-sm font-medium text-orbix-400 uppercase tracking-widest mb-3">
            Processus
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            {t('title')}
          </h2>
          <p className="text-text-secondary max-w-xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <div key={i} className="relative text-center group">

              {/* Ligne de connexion */}
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-[60%] w-full h-px bg-gradient-to-r from-orbix-500/50 to-transparent" />
              )}

              {/* Numéro + Icône */}
              <div className="relative inline-flex flex-col items-center mb-6">
                <span className="font-display text-5xl font-bold text-surface-border mb-2 group-hover:text-orbix-500/20 transition-colors">
                  {step.number}
                </span>
                <div className="h-14 w-14 rounded-2xl border border-orbix-500/20 bg-orbix-500/10 flex items-center justify-center text-orbix-400 group-hover:border-orbix-500/50 group-hover:shadow-glow-purple transition-all duration-300">
                  {step.icon}
                </div>
              </div>

              <h3 className="font-display text-lg font-semibold text-white mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-text-muted leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
