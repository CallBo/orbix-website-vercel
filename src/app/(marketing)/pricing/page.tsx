import type { Metadata } from 'next'

import { Container } from '@/components/layout/Container'
import { PricingSection } from '@/components/marketing/PricingSection'

export const metadata: Metadata = {
  title: 'Tarifs',
  description: 'Des formules pensées pour un projet ponctuel ou un accompagnement continu.',
}

const faqs = [
  {
    question: 'Combien de temps prend un premier projet ?',
    answer:
      'Un site vitrine simple prend en général 2 à 3 semaines. Une application métier complète compte plutôt en mois — on cadre un délai précis dès le brief.',
  },
  {
    question: 'Puis-je changer de formule en cours de route ?',
    answer:
      "Oui. La plupart des clients démarrent en Starter pour un premier projet, puis passent en Croissance quand le besoin devient récurrent.",
  },
  {
    question: 'Quels moyens de paiement acceptez-vous ?',
    answer: 'MTN Mobile Money, Moov Money, Celtiis Money, carte bancaire et virement bancaire.',
  },
  {
    question: "L'hébergement est-il inclus ?",
    answer:
      "Oui pour les formules Starter et Croissance. Pour les projets sur mesure, l'hébergement est chiffré séparément selon l'infrastructure requise.",
  },
]

export default function PricingPage() {
  return (
    <div className="pt-32 md:pt-40">
      <Container className="max-w-2xl">
        <h1 className="font-display text-4xl font-bold tracking-tight text-white md:text-5xl">Tarifs</h1>
        <p className="mt-4 text-base leading-relaxed text-text-secondary">
          Pas de grille figée : chaque devis part d’un brief réel. Voici les repères de
          base.
        </p>
      </Container>

      <PricingSection />

      <Container className="max-w-2xl py-24 md:py-32">
        <h2 className="font-display text-2xl font-semibold text-white">Questions fréquentes</h2>
        <div className="mt-8 space-y-6">
          {faqs.map((faq) => (
            <div key={faq.question} className="border-b border-surface-border pb-6 last:border-b-0">
              <p className="font-medium text-white">{faq.question}</p>
              <p className="mt-2 text-sm leading-relaxed text-text-secondary">{faq.answer}</p>
            </div>
          ))}
        </div>
      </Container>
    </div>
  )
}
