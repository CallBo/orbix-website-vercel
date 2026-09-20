import Link from 'next/link'

import { Container } from '@/components/layout/Container'
import { Button } from '@/components/ui/Button'

export function FinalCta() {
  return (
    <section className="py-24 md:py-32">
      <Container className="max-w-2xl text-center">
        <h2 className="font-display text-3xl font-semibold tracking-tight text-white md:text-4xl">
          Prêt à entrer dans l&apos;univers Orbix ?
        </h2>
        <p className="mt-4 text-base text-text-secondary">
          Créez votre compte et déposez votre premier projet en quelques minutes.
        </p>
        <div className="mt-8">
          <Button variant="gradient" size="xl" asChild>
            <Link href="/auth/register">Créer mon compte gratuitement</Link>
          </Button>
        </div>
      </Container>
    </section>
  )
}
