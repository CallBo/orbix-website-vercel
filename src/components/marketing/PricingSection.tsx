import Link from 'next/link'
import { Check } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Container } from '@/components/layout/Container'
import { Button } from '@/components/ui/Button'

const plans = [
  {
    name: 'Starter',
    description: 'Pour lancer un premier site ou une première application.',
    price: 'À partir de 350 000 FCFA',
    cadence: 'projet',
    features: ['Site vitrine ou landing page', 'Hébergement inclus 6 mois', 'Dashboard de suivi de projet', 'Support par messagerie'],
    highlighted: false,
  },
  {
    name: 'Croissance',
    description: 'Pour les entreprises avec des besoins réguliers.',
    price: 'À partir de 120 000 FCFA',
    cadence: 'mois',
    features: [
      'Développement continu',
      'Hébergement et supervision inclus',
      'Accès à Orbix AI',
      'Support prioritaire sous 24h',
    ],
    highlighted: true,
  },
  {
    name: 'Sur mesure',
    description: 'Pour les projets complexes ou multi-plateformes.',
    price: 'Devis personnalisé',
    cadence: null,
    features: ['Équipe dédiée', 'Architecture cloud avancée', 'Intégrations IA sur mesure', 'SLA négocié'],
    highlighted: false,
  },
]

export function PricingSection() {
  return (
    <section id="pricing" className="border-t border-surface-border py-24 md:py-32">
      <Container>
        <div className="max-w-2xl">
          <h2 className="font-display text-3xl font-semibold tracking-tight text-white md:text-4xl">Tarifs</h2>
          <p className="mt-4 text-base leading-relaxed text-text-secondary">
            Un projet ponctuel ou un accompagnement continu — choisissez ce qui correspond à votre rythme.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={cn(
                'flex flex-col rounded-2xl border p-8',
                plan.highlighted
                  ? 'gradient-border shadow-card-hover'
                  : 'border-surface-border bg-surface-raised'
              )}
            >
              <h3 className="font-display text-lg font-semibold text-white">{plan.name}</h3>
              <p className="mt-2 text-sm text-text-secondary">{plan.description}</p>

              <div className="mt-6">
                <span className="font-display text-2xl font-bold text-white">{plan.price}</span>
                {plan.cadence && <span className="text-sm text-text-muted"> / {plan.cadence}</span>}
              </div>

              <ul className="mt-6 flex-1 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm text-text-secondary">
                    <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-orbix-400" />
                    {feature}
                  </li>
                ))}
              </ul>

              <Button
                variant={plan.highlighted ? 'gradient' : 'secondary'}
                size="lg"
                className="mt-8"
                asChild
              >
                <Link href="/contact">{plan.cadence ? 'Démarrer' : 'Demander un devis'}</Link>
              </Button>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
