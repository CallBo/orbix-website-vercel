import type { Metadata } from 'next'

import { Container } from '@/components/layout/Container'
import { AmbientVideo } from '@/components/marketing/AmbientVideo'

export const metadata: Metadata = {
  title: 'À propos',
  description: "L'histoire et la mission d'Orbix Labs.",
}

export default function AboutPage() {
  return (
    <div className="py-32 md:py-40">
      <Container className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
        <div className="max-w-2xl">
          <h1 className="font-display text-4xl font-bold tracking-tight text-text-primary md:text-5xl">
            Construit depuis Cotonou
          </h1>

          <div className="mt-8 space-y-6 text-base leading-relaxed text-text-secondary">
            <p>
              Orbix Labs est une agence technologique basée au Bénin. Nous concevons des
              sites, des applications et des outils d’intelligence artificielle pour des
              entreprises qui n’ont ni le temps ni l’envie de gérer un prestataire à
              distance sans visibilité sur son travail.
            </p>
            <p>
              Notre différence tient à une conviction simple : un client devrait pouvoir
              suivre son projet aussi facilement qu’il suit un colis. C’est pour ça que
              chaque projet Orbix vit dans un dashboard — avancement, fichiers, messages
              et factures au même endroit, sans échange perdu dans WhatsApp.
            </p>
            <p>
              L’équipe grandit progressivement : chaque produit que nous livrons à un
              client, nous l’utilisons d’abord nous-mêmes.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            <div className="rounded-2xl border border-surface-border bg-surface-raised p-6">
              <p className="font-display text-2xl font-bold text-text-primary">2025</p>
              <p className="mt-1 text-sm text-text-muted">Fondation d’Orbix Labs</p>
            </div>
            <div className="rounded-2xl border border-surface-border bg-surface-raised p-6">
              <p className="font-display text-2xl font-bold text-text-primary">Cotonou</p>
              <p className="mt-1 text-sm text-text-muted">Bénin — équipe locale</p>
            </div>
          </div>
        </div>

        <AmbientVideo
          src="/about-typing.mp4"
          poster="/about-typing-poster.jpg"
          className="aspect-[4/5] w-full rounded-2xl border border-surface-border object-cover lg:sticky lg:top-32"
        />
      </Container>
    </div>
  )
}
