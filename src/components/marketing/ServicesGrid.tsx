import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Container } from '@/components/layout/Container'
import { Reveal } from '@/components/ui/Reveal'
import {
  SoftwareVisual,
  AiVisual,
  CloudVisual,
  SecurityVisual,
  AutomationVisual,
  MarketplaceVisual,
} from './ServiceVisuals'

// Grille "bento" façon apple.com : chaque tuile montre un fragment de
// produit (mini-maquette d'interface, voir ServiceVisuals) plutôt qu'un
// halo de couleur abstrait — comme Apple montre une app dans ses
// vignettes. Fond noir, contenu monochrome, titre en gros, un seul lien.
const services = [
  {
    visual: SoftwareVisual,
    eyebrow: 'Développement',
    title: 'Software',
    description: 'Sites web, applications métier et logiciels sur mesure, du brief à la mise en production.',
    href: '/services#software',
    size: 'lg' as const,
  },
  {
    visual: AiVisual,
    eyebrow: 'Orbix AI',
    title: 'Intelligence artificielle',
    description: 'Assistants, automatisations et intégrations IA construits autour de vos données.',
    href: '/services#ai',
    size: 'lg' as const,
  },
  {
    visual: CloudVisual,
    eyebrow: 'Infrastructure',
    title: 'Cloud',
    description: 'Hébergement, mise à l’échelle et supervision de votre infrastructure.',
    href: '/services#cloud',
    size: 'sm' as const,
  },
  {
    visual: SecurityVisual,
    eyebrow: 'Protection',
    title: 'Cybersécurité',
    description: 'Audits, durcissement et surveillance continue pour protéger vos systèmes.',
    href: '/services#security',
    size: 'sm' as const,
  },
  {
    visual: AutomationVisual,
    eyebrow: 'Efficacité',
    title: 'Automatisation',
    description: 'Des tâches répétitives éliminées par des flux connectés à vos outils existants.',
    href: '/services#automation',
    size: 'sm' as const,
  },
  {
    visual: MarketplaceVisual,
    eyebrow: 'Modules',
    title: 'Marketplace',
    description: 'Des modules prêts à l’emploi pour lancer une fonctionnalité sans repartir de zéro.',
    href: '/services#marketplace',
    size: 'sm' as const,
  },
]

type Service = (typeof services)[number]

function ServiceTile({ service, delay }: { service: Service; delay: number }) {
  const Visual = service.visual
  const isLarge = service.size === 'lg'

  return (
    <Reveal delay={delay} className="h-full">
      <Link
        href={service.href}
        className={cn(
          'group relative flex h-full flex-col overflow-hidden rounded-[28px] bg-ink-900 transition-transform duration-500 ease-apple hover:scale-[1.01]',
          isLarge ? 'min-h-[30rem]' : 'min-h-[22rem]'
        )}
      >
        {/* Zone visuelle : la maquette, centrée, légèrement agrandie au survol */}
        <div
          aria-hidden="true"
          className={cn(
            'relative flex flex-1 items-center justify-center px-8 pt-10 transition-transform duration-700 ease-apple group-hover:scale-[1.03]',
            isLarge ? 'pb-4' : 'pb-2'
          )}
        >
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          <Visual />
        </div>

        {/* Texte */}
        <div className={cn('relative px-8', isLarge ? 'pb-9' : 'pb-7')}>
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/45">{service.eyebrow}</p>
          <h3
            className={cn(
              'mt-1.5 font-display font-semibold leading-[1.05] tracking-tighter text-white',
              isLarge ? 'text-4xl md:text-5xl' : 'text-2xl'
            )}
          >
            {service.title}
          </h3>
          <p className={cn('mt-2.5 max-w-sm leading-relaxed text-white/55', isLarge ? 'text-base' : 'text-sm')}>
            {service.description}
          </p>
          <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-white">
            En savoir plus
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </Link>
    </Reveal>
  )
}

export function ServicesGrid() {
  const featured = services.slice(0, 2)
  const rest = services.slice(2)

  return (
    <section id="services" className="py-24 md:py-32">
      <Container>
        <Reveal className="max-w-3xl">
          <h2 className="font-display text-4xl font-semibold tracking-tighter text-text-primary md:text-6xl">
            Six métiers.
            <br />
            <span className="text-text-muted">Une seule équipe.</span>
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-4 lg:grid-cols-2">
          {featured.map((service, i) => (
            <ServiceTile key={service.title} service={service} delay={i * 0.08} />
          ))}
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {rest.map((service, i) => (
            <ServiceTile key={service.title} service={service} delay={i * 0.08} />
          ))}
        </div>
      </Container>
    </section>
  )
}
