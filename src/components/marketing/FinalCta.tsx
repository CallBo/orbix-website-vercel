import Link from 'next/link'

import { Container } from '@/components/layout/Container'
import { Button } from '@/components/ui/Button'
import { Reveal } from '@/components/ui/Reveal'

// Deuxième et dernière bande sombre de la page d'accueil : elle referme
// la page en écho au Hero, comme les pages produit Apple qui ouvrent et
// terminent sur un fond noir pour encadrer le contenu clair entre les deux.
export function FinalCta() {
  return (
    <section className="ink-section py-24 md:py-32">
      <Container className="max-w-2xl text-center">
        <Reveal>
          <h2 className="font-display text-3xl font-semibold tracking-tight text-text-inverse md:text-5xl">
            Prêt à entrer dans l&apos;univers Orbix ?
          </h2>
          <p className="mt-4 text-base text-white/60 md:text-lg">
            Créez votre compte et déposez votre premier projet en quelques minutes.
          </p>
          <div className="mt-9">
            <Button variant="primary" size="xl" asChild className="bg-white text-ink-900 hover:bg-white/85">
              <Link href="/auth/register">Créer mon compte gratuitement</Link>
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
