import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import { Container } from '@/components/layout/Container'
import { Button } from '@/components/ui/Button'
import { OrbixLogo } from '@/components/layout/OrbixLogo'
import { HeroOrbit } from './HeroOrbit'

// Hero en bande sombre façon keynote : grand titre centré, logo en
// filigrane, photo en fond (clavier rétroéclairé, noir brillant/argent)
// assombrie par un dégradé, avec les anneaux orbitaux en surimpression
// discrète pour la touche de mouvement et de marque. Contraste volontaire
// avec le reste du site, désormais clair : c'est le seul "moment fort"
// sombre de la page d'accueil, comme Apple le fait sur ses pages de
// lancement — entièrement monochrome, aucune couleur de marque saturée.
export function Hero() {
  return (
    <section className="ink-section relative isolate flex min-h-[92vh] items-center overflow-hidden pt-14">
      <div className="duotone-ink absolute inset-0 -z-20">
        <Image
          src="/hero-keyboard.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="scale-110 object-cover object-[70%_40%] opacity-60 blur-[2px]"
        />
      </div>
      <div className="-z-10">
        <HeroOrbit />
      </div>

      <Container className="relative flex flex-col items-center py-24 text-center md:py-32">
        <OrbixLogo variant="mono" className="mb-8 h-20 animate-fade-in md:h-28" />

        <h1 className="animate-fade-in-up font-display text-5xl font-bold leading-[0.95] tracking-tightest text-text-inverse md:text-7xl lg:text-8xl">
          Engineering
          <br />
          Tomorrow.
        </h1>
        <p
          className="mt-7 max-w-xl animate-fade-in-up font-body text-lg leading-relaxed text-white/60 md:text-xl"
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
