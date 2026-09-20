import Link from 'next/link'
import { ArrowRight, Code2, Sparkles, Cloud, ShieldCheck, Workflow, ShoppingBag } from 'lucide-react'

import { Container } from '@/components/layout/Container'

const services = [
  {
    icon: Code2,
    title: 'Software',
    description: 'Sites web, applications métier et logiciels sur mesure, du brief à la mise en production.',
    href: '/services#software',
  },
  {
    icon: Sparkles,
    title: 'Intelligence artificielle',
    description: 'Assistants, automatisations et intégrations IA construits autour de vos données.',
    href: '/services#ai',
  },
  {
    icon: Cloud,
    title: 'Cloud',
    description: 'Hébergement, mise à l’échelle et supervision de votre infrastructure.',
    href: '/services#cloud',
  },
  {
    icon: ShieldCheck,
    title: 'Cybersécurité',
    description: 'Audits, durcissement et surveillance continue pour protéger vos systèmes.',
    href: '/services#security',
  },
  {
    icon: Workflow,
    title: 'Automatisation',
    description: "Des tâches répétitives éliminées par des flux connectés à vos outils existants.",
    href: '/services#automation',
  },
  {
    icon: ShoppingBag,
    title: 'Marketplace',
    description: 'Des modules prêts à l’emploi pour lancer une fonctionnalité sans repartir de zéro.',
    href: '/services#marketplace',
  },
]

export function ServicesGrid() {
  return (
    <section id="services" className="py-24 md:py-32">
      <Container>
        <div className="max-w-2xl">
          <h2 className="font-display text-3xl font-semibold tracking-tight text-white md:text-4xl">Nos services</h2>
          <p className="mt-4 text-base leading-relaxed text-text-secondary">
            Six domaines d’intervention, une seule équipe qui les connecte.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Link
              key={service.title}
              href={service.href}
              className="group relative overflow-hidden rounded-2xl border border-surface-border bg-surface-raised p-8 transition-all duration-300 hover:-translate-y-1 hover:border-orbix-500/40"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-orbix-500/0 to-cyan-400/0 transition-all duration-500 group-hover:from-orbix-500/5 group-hover:to-cyan-400/5" />

              <div className="relative mb-6 inline-flex rounded-xl border border-orbix-500/20 bg-orbix-500/10 p-3 text-orbix-400">
                <service.icon className="h-5 w-5" />
              </div>

              <h3 className="relative font-display text-xl font-semibold text-white transition-colors group-hover:text-orbix-300">
                {service.title}
              </h3>

              <p className="relative mt-3 text-sm leading-relaxed text-text-secondary">{service.description}</p>

              <div className="relative mt-6 flex items-center text-sm font-medium text-orbix-400 transition-colors group-hover:text-orbix-300">
                En savoir plus
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  )
}
