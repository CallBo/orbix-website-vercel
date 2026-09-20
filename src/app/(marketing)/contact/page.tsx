import type { Metadata } from 'next'
import { Mail, MapPin, Clock } from 'lucide-react'

import { Container } from '@/components/layout/Container'
import { ContactForm } from '@/components/forms/ContactForm'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Décrivez votre projet, notre équipe vous répond sous 24h ouvrées.',
}

export default function ContactPage() {
  return (
    <div className="py-32 md:py-40">
      <Container className="grid gap-16 lg:grid-cols-[1fr_1.2fr]">
        <div>
          <h1 className="font-display text-4xl font-bold tracking-tight text-white md:text-5xl">
            Parlons de votre projet
          </h1>
          <p className="mt-4 max-w-md text-base leading-relaxed text-text-secondary">
            Que ce soit une idée encore floue ou un cahier des charges complet,
            décrivez-nous votre besoin — on revient vers vous sous 24h ouvrées.
          </p>

          <ul className="mt-10 space-y-6">
            <li className="flex items-start gap-3">
              <Mail className="mt-0.5 h-5 w-5 text-orbix-400" />
              <div>
                <p className="text-sm font-medium text-white">Email</p>
                <a href="mailto:hello@orbixlabs.tech" className="text-sm text-text-secondary hover:text-white">
                  hello@orbixlabs.tech
                </a>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-5 w-5 text-orbix-400" />
              <div>
                <p className="text-sm font-medium text-white">Bureau</p>
                <p className="text-sm text-text-secondary">Cotonou, Bénin</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="mt-0.5 h-5 w-5 text-orbix-400" />
              <div>
                <p className="text-sm font-medium text-white">Délai de réponse</p>
                <p className="text-sm text-text-secondary">Sous 24h ouvrées</p>
              </div>
            </li>
          </ul>
        </div>

        <div className="rounded-2xl border border-surface-border bg-surface-raised p-8">
          <ContactForm />
        </div>
      </Container>
    </div>
  )
}
