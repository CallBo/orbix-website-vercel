import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import { Container } from '@/components/layout/Container'
import { Button } from '@/components/ui/Button'
import { AmbientVideo } from './AmbientVideo'

export function Hero() {
  return (
    <section className="relative isolate flex min-h-[92vh] items-center overflow-hidden pt-16">
      <div className="duotone-violet absolute inset-0 -z-10">
        <AmbientVideo src="/hero-bg.mp4" poster="/hero-bg-poster.jpg" className="h-full w-full object-cover" />
      </div>

      <Container className="relative py-24 md:py-32">
        <div className="max-w-2xl">
          <h1 className="font-display text-5xl font-bold leading-none tracking-tight text-white md:text-7xl">
            Engineering
            <br />
            Tomorrow.
          </h1>
          <p className="mt-6 max-w-lg font-body text-lg leading-relaxed text-text-secondary">
            La plateforme technologique pensée pour les entreprises africaines. Un
            espace unique pour suivre vos projets, discuter avec notre équipe et payer
            vos factures.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Button variant="gradient" size="xl" asChild>
              <Link href="/auth/register">
                Get Started <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button variant="secondary" size="xl" asChild>
              <Link href="/services">Voir nos services</Link>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  )
}
