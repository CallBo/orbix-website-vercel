import type { Metadata } from 'next'

import { Container } from '@/components/layout/Container'
import { Reveal } from '@/components/ui/Reveal'
import { AmbientVideo } from '@/components/marketing/AmbientVideo'
import { Founders } from '@/components/marketing/Founders'

export const metadata: Metadata = {
  title: 'À propos',
  description: "L'histoire, la mission et les fondateurs d'Orbix Labs.",
}

export default function AboutPage() {
  return (
    <>
      <div className="pb-8 pt-32 md:pt-40">
        <Container className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <Reveal className="max-w-2xl">
            <h1 className="font-display text-5xl font-semibold tracking-tightest text-text-primary md:text-7xl">
              Construit depuis Cotonou.
            </h1>

            <div className="mt-8 space-y-6 text-lg leading-relaxed text-text-secondary">
              <p>
                Orbix Labs est une agence technologique basée au Bénin. Nous concevons des sites, des applications et
                des outils d’intelligence artificielle pour des entreprises qui n’ont ni le temps ni l’envie de gérer un
                prestataire à distance sans visibilité sur son travail.
              </p>
              <p>
                Notre différence tient à une conviction simple : un client devrait pouvoir suivre son projet aussi
                facilement qu’il suit un colis. C’est pour ça que chaque projet Orbix vit dans un espace en ligne —
                avancement, fichiers, messages et factures au même endroit, sans échange perdu dans WhatsApp.
              </p>
              <p>
                L’équipe grandit progressivement : chaque produit que nous livrons à un client, nous l’utilisons d’abord
                nous-mêmes.
              </p>
            </div>

            <div className="mt-12 grid gap-4 sm:grid-cols-2">
              <div className="rounded-[24px] bg-surface-overlay p-7">
                <p className="font-display text-4xl font-semibold tracking-tighter text-text-primary">2025</p>
                <p className="mt-1 text-[15px] text-text-secondary">Fondation d’Orbix Labs</p>
              </div>
              <div className="rounded-[24px] bg-surface-overlay p-7">
                <p className="font-display text-4xl font-semibold tracking-tighter text-text-primary">Cotonou</p>
                <p className="mt-1 text-[15px] text-text-secondary">Bénin — équipe locale</p>
              </div>
            </div>
          </Reveal>

          <AmbientVideo
            src="/about-typing.mp4"
            poster="/about-typing-poster.jpg"
            className="aspect-[4/5] w-full rounded-[28px] object-cover lg:sticky lg:top-28"
          />
        </Container>
      </div>

      <Founders />
    </>
  )
}
