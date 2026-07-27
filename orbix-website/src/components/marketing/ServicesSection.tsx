'use client'

import { useTranslations } from 'next-intl'
import { Globe, Smartphone, Bot, Cloud, Shield, Zap, Video, ArrowRight } from 'lucide-react'

export function ServicesSection({ locale }: { locale: string }) {
  const t = useTranslations('services')

  const services = [
    {
      icon: <Globe className="h-6 w-6" />,
      title: t('software.title'),
      description: t('software.description'),
      href: `/${locale}/services/software`,
      color: 'text-orbix-400 bg-orbix-500/10 border-orbix-500/20',
    },
    {
      icon: <Bot className="h-6 w-6" />,
      title: t('ai.title'),
      description: t('ai.description'),
      href: `/${locale}/services/ai`,
      color: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
    },
    {
      icon: <Cloud className="h-6 w-6" />,
      title: t('cloud.title'),
      description: t('cloud.description'),
      href: `/${locale}/services/cloud`,
      color: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: t('security.title'),
      description: t('security.description'),
      href: `/${locale}/services/security`,
      color: 'text-red-400 bg-red-500/10 border-red-500/20',
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: t('automation.title'),
      description: t('automation.description'),
      href: `/${locale}/services/automation`,
      color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
    },
    {
      icon: <Video className="h-6 w-6" />,
      title: t('video.title'),
      description: t('video.description'),
      href: `/${locale}/services/video`,
      color: 'text-orange-400 bg-orange-500/10 border-orange-500/20',
    },
  ]

  return (
    <section className="py-24 px-4 md:px-6">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-sm font-medium text-orbix-400 uppercase tracking-widest mb-3">
            Services
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            {t('title')}
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        {/* Grille */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <a
              key={i}
              href={service.href}
              className="group relative rounded-2xl border border-surface-border bg-surface-raised p-8 transition-all duration-300 hover:border-orbix-500/30 hover:-translate-y-1 hover:shadow-card-hover overflow-hidden"
            >
              {/* Glow hover */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-orbix-500/0 to-orbix-500/0 group-hover:from-orbix-500/5 group-hover:to-purple-500/5 transition-all duration-500" />

              {/* Icône */}
              <div className={`relative inline-flex rounded-xl p-3 border mb-6 ${service.color}`}>
                {service.icon}
              </div>

              {/* Titre */}
              <h3 className="relative font-display text-xl font-semibold text-white mb-3 group-hover:text-orbix-300 transition-colors">
                {service.title}
              </h3>

              {/* Description */}
              <p className="relative text-sm text-text-secondary leading-relaxed mb-6">
                {service.description}
              </p>

              {/* Lien */}
              <div className="relative flex items-center text-sm font-medium text-orbix-400 group-hover:text-orbix-300 transition-colors">
                {t('learnmore')}
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  )
}
