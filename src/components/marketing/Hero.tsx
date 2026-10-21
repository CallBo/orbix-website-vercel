import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import { Container } from '@/components/layout/Container'
import { Button } from '@/components/ui/Button'
import { OrbixLogo } from '@/components/layout/OrbixLogo'

// Hero façon keynote : grand titre centré sur une vue aérienne de Cotonou
// (Yanick Folly, Unsplash), qui avance très lentement (effet "Ken Burns")
// pour donner du mouvement sans distraire. Un dégradé sombre garde le
// texte blanc lisible tout en laissant voir la ville.
export function Hero() {
  return (
    <section className="relative isolate flex min-h-[92vh] items-center overflow-hidden bg-black pt-14 text-white">
      <div className="absolute inset-0 -z-20 overflow-hidden">
        <Image
          src="/photos/cotonou.webp"
          alt="Vue aérienne de Cotonou"
          fill
          priority
          sizes="100vw"
          className="animate-kenburns object-cover object-[50%_60%]"
        />
      </div>
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-black/65 via-black/45 to-black/80" />
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{ background: 'radial-gradient(ellipse 55% 45% at 50% 58%, rgba(0,0,0,0.45), transparent 75%)' }}
      />

      <Container className="relative flex flex-col items-center py-24 text-center md:py-32">
        <OrbixLogo variant="mono" className="mb-8 h-20 animate-fade-in md:h-28" />

        <h1 className="animate-fade-in-up font-display text-5xl font-bold leading-[0.95] tracking-tightest text-text-inverse md:text-7xl lg:text-8xl">
          Engineering
          <br />
          Tomorrow.
        </h1>
        <p
          className="mt-7 max-w-xl animate-fade-in-up font-body text-lg leading-relaxed text-white/85 md:text-xl"
          style={{ animationDelay: '0.1s', animationFillMode: 'backwards' }}
        >
          La plateforme technologique pensée pour les entreprises africaines. Un espace
          unique pour suivre vos projets, discuter avec notre équipe et payer vos factures.
        </p>
        <div
          className="mt-10 flex animate-fade-in-up flex-wrap items-center justify-center gap-4"
          style={{ animationDelay: '0.2s', animationFillMode: 'backwards' }}
        >
          <Button variant="primary" size="xl" asChild className="bg-white text-ink-900 hover:bg-white/85">
            <Link href="/auth/register">
              Commencer <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="xl"
            asChild
            className="text-text-inverse hover:bg-white/10 hover:text-text-inverse"
          >
            <Link href="/services">Voir nos services</Link>
          </Button>
        </div>
      </Container>
    </section>
  )
}
