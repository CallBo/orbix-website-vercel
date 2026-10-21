import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import { Container } from '@/components/layout/Container'
import { Reveal } from '@/components/ui/Reveal'
import { realisations } from '@/lib/realisations'

export const metadata: Metadata = {
  title: 'Réalisations',
  description: 'Les plateformes conçues et développées par Orbix Labs pour les entreprises et institutions africaines.',
}

export default function RealisationsPage() {
  return (
    <div className="bg-white pb-24 pt-28 md:pb-32 md:pt-36">
      <Container>
        <Reveal className="max-w-3xl">
          <h1 className="font-display text-5xl font-semibold tracking-tightest text-text-primary md:text-7xl">Réalisations.</h1>
          <p className="mt-4 text-xl text-text-secondary md:text-2xl">
            Des outils conçus avec ceux qui les utilisent, pour des problèmes bien réels.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {realisations.map((r, i) => (
            <Reveal key={r.slug} delay={i * 0.08}>
              <Link href={`/realisations/${r.slug}`} className="group block">
                <div className="overflow-hidden rounded-[28px] bg-surface-overlay">
                  <Image
                    src={r.thumbnail}
                    alt={r.title}
                    width={1200}
                    height={900}
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="w-full transition-transform duration-700 ease-apple group-hover:scale-[1.03]"
                  />
                </div>
                <p className="mt-5 text-sm font-semibold uppercase tracking-[0.14em] text-text-muted">
                  {r.sector} · {r.year}
                </p>
                <h2 className="mt-1.5 font-display text-3xl font-semibold tracking-tighter text-text-primary">{r.title}</h2>
                <p className="mt-2 text-[17px] text-text-secondary">{r.tagline}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-[15px] font-medium text-text-primary">
                  Voir le projet <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </div>
  )
}
