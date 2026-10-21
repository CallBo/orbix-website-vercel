import { Container } from '@/components/layout/Container'
import { Reveal } from '@/components/ui/Reveal'

// Trois engagements en très gros, façon apple.com ("Pro. Beyond.") —
// la typographie porte le message, pas des icônes.
const props = [
  { title: 'Rapide.', description: 'Vos projets suivis en temps réel, sans attendre un rapport hebdomadaire.' },
  { title: 'Intelligent.', description: 'Des outils IA intégrés directement à votre espace de travail.' },
  { title: 'Sûr.', description: 'Vos données protégées, hébergées sur une infrastructure moderne.' },
]

export function ValueProps() {
  return (
    <section className="py-24 md:py-32">
      <Container>
        <div className="grid gap-14 md:grid-cols-3 md:gap-10">
          {props.map((prop, i) => (
            <Reveal key={prop.title} delay={i * 0.1}>
              <h3 className="font-display text-5xl font-semibold tracking-tighter text-text-primary md:text-6xl">
                {prop.title}
              </h3>
              <p className="mt-4 max-w-xs text-lg leading-relaxed text-text-secondary">{prop.description}</p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
