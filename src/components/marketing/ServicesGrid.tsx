import Link from 'next/link'
import { ArrowRight, Code2, Sparkles, Cloud, ShieldCheck, Workflow, ShoppingBag } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Container } from '@/components/layout/Container'
import { Reveal } from '@/components/ui/Reveal'

// Grille "bento" façon apple.com (cf. les tuiles de la page d'accueil
// Apple : grandes vignettes sombres, image/illustration en fond, titre en
// gros, un seul lien pilule) plutôt que des cartes icône + paragraphe.
// Pas de photo produit disponible : le "visuel" de chaque tuile est un
// halo bleu Orbix positionné différemment selon l'index, sur fond quasi
// noir — décliné depuis l'identité de marque plutôt qu'un dégradé
// générique multicolore.
const services = [
  {
    icon: Code2,
    eyebrow: 'Développement',
    title: 'Software',
    description: 'Sites web, applications métier et logiciels sur mesure, du brief à la mise en production.',
    href: '/services#software',
    size: 'lg' as const,
    glow: '20% 20%',
  },
  {
    icon: Sparkles,
    eyebrow: 'Orbix AI',
    title: 'Intelligence artificielle',
    description: 'Assistants, automatisations et intégrations IA construits autour de vos données.',
    href: '/services#ai',
    size: 'lg' as const,
    glow: '80% 30%',
  },
  {
    icon: Cloud,
    eyebrow: 'Infrastructure',
    title: 'Cloud',
    description: 'Hébergement, mise à l’échelle et supervision de votre infrastructure.',
    href: '/services#cloud',
    size: 'sm' as const,
    glow: '30% 0%',
  },
  {
    icon: ShieldCheck,
    eyebrow: 'Protection',
    title: 'Cybersécurité',
    description: 'Audits, durcissement et surveillance continue pour protéger vos systèmes.',
    href: '/services#security',
    size: 'sm' as const,
    glow: '70% 100%',
  },
  {
    icon: Workflow,
    eyebrow: 'Efficacité',
    title: 'Automatisation',
    description: "Des tâches répétitives éliminées par des flux connectés à vos outils existants.",
    href: '/services#automation',
    size: 'sm' as const,
    glow: '0% 60%',
  },
  {
    icon: ShoppingBag,
    eyebrow: 'Modules',
    title: 'Marketplace',
    description: 'Des modules prêts à l’emploi pour lancer une fonctionnalité sans repartir de zéro.',
    href: '/services#marketplace',
    size: 'sm' as const,
    glow: '100% 20%',
  },
]

function ServiceTile({ service, delay }: { service: (typeof services)[number]; delay: number }) {
  return (
    <Reveal delay={delay} className={cn('h-full', service.size === 'lg' ? 'lg:col-span-1' : '')}>
      <Link
        href={service.href}
        className={cn(
          'group relative flex h-full flex-col justify-end overflow-hidden rounded-[28px] bg-ink-800 p-7 transition-transform duration-500 ease-apple hover:-translate-y-1',
          service.size === 'lg' ? 'min-h-[22rem]' : 'min-h-[14rem]'
        )}
      >
        <div
          className="absolute inset-0 opacity-70 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background: `radial-gradient(circle at ${service.glow}, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0) 55%)`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

        <div className="relative inline-flex w-fit rounded-full border border-white/15 bg-white/5 p-2.5 text-white/90 backdrop-blur-sm">
          <service.icon className="h-4 w-4" />
        </div>

        <div className="relative mt-auto pt-10">
          <p className="text-xs font-semibold uppercase tracking-wider text-orbix-300">{service.eyebrow}</p>
          <h3
            className={cn(
              'mt-1.5 font-display font-semibold leading-tight tracking-tight text-white',
              service.size === 'lg' ? 'text-3xl md:text-4xl' : 'text-2xl'
            )}
          >
            {service.title}
          </h3>
          <p className="mt-2 max-w-sm text-sm leading-relaxed text-white/60">{service.description}</p>

          <div className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-white">
            En savoir plus
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </Link>
    </Reveal>
  )
}

export function ServicesGrid() {
  const big1 = services[0]!
  const big2 = services[1]!
  const rest = services.slice(2)

  return (
    <section id="services" className="py-24 md:py-32">
      <Container>
        <Reveal className="max-w-2xl">
          <h2 className="font-display text-3xl font-semibold tracking-tight text-text-primary md:text-4xl">Nos services</h2>
          <p className="mt-4 text-base leading-relaxed text-text-secondary">
            Six domaines d’intervention, une seule équipe qui les connecte.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-4 lg:grid-cols-2">
          <ServiceTile service={big1} delay={0} />
          <ServiceTile service={big2} delay={0.08} />
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {rest.map((service, i) => (
            <ServiceTile key={service.title} service={service} delay={(i % 4) * 0.08} />
          ))}
        </div>
      </Container>
    </section>
  )
}
