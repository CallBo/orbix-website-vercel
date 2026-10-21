import { Container } from '@/components/layout/Container'
import { Reveal } from '@/components/ui/Reveal'

export function FoundingNote() {
  return (
    <section className="border-y border-surface-border bg-surface-overlay py-24 md:py-32">
      <Container className="max-w-3xl text-center">
        <Reveal>
          <p className="font-display text-2xl font-medium leading-snug tracking-tight text-text-primary md:text-3xl">
            Orbix Labs est né à Cotonou d&apos;un constat simple : les entreprises
            africaines méritent des outils aussi solides que ceux des grandes
            plateformes internationales, sans l&apos;opacité qui va souvent avec.
          </p>
          <p className="mt-6 text-sm text-text-muted">Samuel Zinsoudje, fondateur d&apos;Orbix Labs</p>
        </Reveal>
      </Container>
    </section>
  )
}
