import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Code2, Sparkles, Cloud, ShieldCheck, Workflow, ShoppingBag, ArrowRight } from 'lucide-react'

import { Container } from '@/components/layout/Container'
import { Button } from '@/components/ui/Button'

export const metadata: Metadata = {
  title: 'Services',
  description: 'Software, intelligence artificielle, cloud, cybersécurité, automatisation et marketplace.',
}

const services = [
  {
    id: 'software',
    icon: Code2,
    title: 'Software',
    summary: 'Sites web, applications métier et logiciels sur mesure.',
    details: [
      'Sites vitrines et applications web sur Next.js',
      'Applications mobiles multiplateformes',
      "Intégration à vos outils existants (paiement, ERP, CRM)",
      'Maintenance et évolutions après livraison',
    ],
  },
  {
    id: 'ai',
    icon: Sparkles,
    title: 'Intelligence artificielle',
    summary: 'Des assistants et automatisations construits autour de vos données.',
    details: [
      'Assistants conversationnels pour vos clients ou vos équipes',
      'Automatisation de tâches répétitives par IA',
      'Intégration de modèles de langage dans vos produits existants',
      'Accompagnement à l’adoption pour vos équipes',
    ],
  },
  {
    id: 'cloud',
    icon: Cloud,
    title: 'Cloud',
    summary: 'Hébergement et supervision de votre infrastructure.',
    details: [
      'Déploiement et mise à l’échelle sur Microsoft Azure',
      'Surveillance et alertes en continu',
      'Sauvegardes et plans de reprise après incident',
      'Optimisation des coûts d’infrastructure',
    ],
  },
  {
    id: 'security',
    icon: ShieldCheck,
    title: 'Cybersécurité',
    summary: 'Audits et surveillance continue pour protéger vos systèmes.',
    details: [
      'Audit de sécurité applicative et infrastructure',
      'Durcissement des accès et des configurations',
      'Surveillance des tentatives d’intrusion',
      'Plan de réponse en cas d’incident',
    ],
  },
  {
    id: 'automation',
    icon: Workflow,
    title: 'Automatisation',
    summary: "Des flux connectés pour éliminer les tâches répétitives.",
    details: [
      'Automatisation de processus internes (facturation, relances, reporting)',
      'Connexion entre vos outils existants',
      'Flux déclenchés par événements métier',
      'Tableaux de suivi de l’activité automatisée',
    ],
  },
  {
    id: 'marketplace',
    icon: ShoppingBag,
    title: 'Marketplace',
    summary: 'Des modules prêts à l’emploi pour aller plus vite.',
    details: [
      'Modules de paiement (Mobile Money, carte bancaire)',
      'Composants d’interface réutilisables',
      'Intégrations tierces pré-configurées',
      'Mise à jour continue des modules disponibles',
    ],
  },
]

export default function ServicesPage() {
  return (
    <div className="py-32 md:py-40">
      <Container className="max-w-2xl">
        <h1 className="font-display text-4xl font-bold tracking-tight text-white md:text-5xl">Nos services</h1>
        <p className="mt-4 text-base leading-relaxed text-text-secondary">
          Six domaines d’intervention, une seule équipe qui les connecte — du premier
          brief à la maintenance en production.
        </p>
      </Container>

      <Container className="mt-12">
        <div className="relative h-64 w-full overflow-hidden rounded-2xl border border-surface-border md:h-80">
          <Image
            src="/services-fiber.jpg"
            alt=""
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 1024px, 100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface-base/80 via-surface-base/10 to-transparent" />
        </div>
      </Container>

      <div className="mt-16 space-y-6">
        <Container>
          {services.map((service) => (
            <section
              key={service.id}
              id={service.id}
              className="scroll-mt-24 border-b border-surface-border py-12 first:pt-0 last:border-b-0"
            >
              <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr] lg:items-start">
                <div>
                  <div className="mb-4 inline-flex rounded-xl border border-orbix-500/20 bg-orbix-500/10 p-3 text-orbix-400">
                    <service.icon className="h-5 w-5" />
                  </div>
                  <h2 className="font-display text-2xl font-semibold text-white">{service.title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-text-secondary">{service.summary}</p>
                  <Button variant="outline" size="sm" className="mt-6" asChild>
                    <Link href="/contact">
                      Demander un devis <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>

                <ul className="space-y-3">
                  {service.details.map((detail) => (
                    <li
                      key={detail}
                      className="rounded-xl border border-surface-border bg-surface-raised px-5 py-4 text-sm text-text-secondary"
                    >
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          ))}
        </Container>
      </div>
    </div>
  )
}
