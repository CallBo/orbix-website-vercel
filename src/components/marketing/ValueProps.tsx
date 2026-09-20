import { Rocket, Sparkles, ShieldCheck } from 'lucide-react'

import { Container } from '@/components/layout/Container'

const props = [
  {
    icon: Rocket,
    title: 'Livraison rapide',
    description: "Vos projets suivis en temps réel, sans attendre un rapport hebdomadaire.",
  },
  {
    icon: Sparkles,
    title: 'Intelligence artificielle',
    description: 'Des outils IA intégrés directement à votre espace de travail.',
  },
  {
    icon: ShieldCheck,
    title: 'Sécurité',
    description: 'Vos données protégées et hébergées sur une infrastructure moderne.',
  },
]

export function ValueProps() {
  return (
    <section className="border-y border-surface-border bg-surface-raised/40 py-16">
      <Container>
        <div className="grid gap-10 sm:grid-cols-3">
          {props.map((prop) => (
            <div key={prop.title} className="flex items-start gap-4">
              <div className="rounded-xl border border-orbix-500/20 bg-orbix-500/10 p-2.5 text-orbix-400">
                <prop.icon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-display text-base font-semibold text-white">{prop.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-text-secondary">{prop.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
