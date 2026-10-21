import { Container } from '@/components/layout/Container'
import { Reveal } from '@/components/ui/Reveal'

const steps = [
  { title: 'Créez votre compte', description: 'Une inscription en moins de deux minutes, sans jargon.' },
  { title: 'Décrivez votre projet', description: 'Un brief guidé pour cadrer vos besoins dès le départ.' },
  { title: "Suivez l'avancement", description: 'Chaque étape, chaque fichier, visible en temps réel.' },
  { title: 'Recevez vos livrables', description: 'Fichiers finaux et facture, centralisés dans votre espace.' },
]

// Étapes sur fond gris très clair (#f5f5f7, le gris "section" d'apple.com),
// avec de grands numéros en filigrane plutôt que de petites pastilles.
export function HowItWorks() {
  return (
    <section className="bg-surface-overlay py-24 md:py-32">
      <Container>
        <Reveal className="max-w-3xl">
          <h2 className="font-display text-4xl font-semibold tracking-tighter text-text-primary md:text-6xl">
            Quatre étapes.
            <br />
            <span className="text-text-muted">Zéro friction.</span>
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <Reveal key={step.title} delay={index * 0.08} className="rounded-[28px] bg-white p-8">
              <span className="block font-display text-7xl font-semibold tracking-tighter text-surface-muted">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-8 font-display text-xl font-semibold tracking-tight text-text-primary">{step.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-text-secondary">{step.description}</p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
