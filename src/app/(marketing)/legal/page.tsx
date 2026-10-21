import type { Metadata } from 'next'

import { Container } from '@/components/layout/Container'

export const metadata: Metadata = {
  title: 'Mentions légales',
}

export default function LegalPage() {
  return (
    <div className="py-32 md:py-40">
      <Container className="max-w-2xl">
        <h1 className="font-display text-4xl font-bold tracking-tight text-text-primary">Mentions légales</h1>
        <div className="mt-8 space-y-6 text-sm leading-relaxed text-text-secondary">
          <p>
            Orbix Labs SARL — Cotonou, Bénin. Contact : hello@orbixlabs.tech.
          </p>
          <p>
            Ce contenu est un texte de départ à faire valider par un conseil
            juridique avant mise en production (raison sociale complète, numéro
            RCCM, IFU, politique de confidentialité, conditions générales).
          </p>
        </div>
      </Container>
    </div>
  )
}
