import { Container } from '@/components/layout/Container'

const steps = [
  { title: 'Créez votre compte', description: 'Une inscription en moins de deux minutes, sans jargon.' },
  { title: 'Décrivez votre projet', description: 'Un brief guidé pour cadrer vos besoins dès le départ.' },
  { title: "Suivez l'avancement", description: 'Chaque étape, chaque fichier, visible en temps réel.' },
  { title: 'Recevez vos livrables', description: 'Fichiers finaux et facture, centralisés dans votre espace.' },
]

export function HowItWorks() {
  return (
    <section className="py-24 md:py-32">
      <Container>
        <div className="max-w-2xl">
          <h2 className="font-display text-3xl font-semibold tracking-tight text-white md:text-4xl">
            Comment ça marche
          </h2>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-4">
          {steps.map((step, index) => (
            <div key={step.title} className="relative pl-14 md:pl-0">
              <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-full border border-orbix-500/30 font-display text-sm font-semibold text-orbix-400 md:mb-6 absolute left-0 top-0 md:relative">
                {index + 1}
              </div>
              <h3 className="font-display text-base font-semibold text-white">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-text-secondary">{step.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
