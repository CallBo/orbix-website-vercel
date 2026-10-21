import Image from 'next/image'
import Link from 'next/link'

import { Reveal } from '@/components/ui/Reveal'
import { realisations } from '@/lib/realisations'

// Mise en avant de la dernière réalisation sur la page d'accueil, dans la
// même grammaire que les panneaux de services (fond gris clair, titre,
// phrase, deux pilules, grand visuel produit qui déborde vers le bas).
export function RealisationSpotlight() {
  const r = realisations[0]
  if (!r) return null

  return (
    <div className="bg-white px-3 pb-3">
      <section
        className="relative flex flex-col items-center overflow-hidden pt-14 text-center md:pt-16"
        style={{ backgroundColor: r.tint }}
      >
        <Reveal className="relative z-10 px-6">
          <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-text-muted">Réalisation · {r.sector}</p>
          <h2 className="mt-2 font-display text-[40px] font-semibold tracking-tighter text-text-primary md:text-[56px]">{r.title}</h2>
          <p className="mx-auto mt-1 max-w-xl font-display text-[21px] tracking-tight text-text-primary/85 md:text-[28px]">{r.tagline}</p>
          <div className="mt-5 flex items-center justify-center gap-3.5">
            <Link
              href={`/realisations/${r.slug}`}
              className="whitespace-nowrap rounded-full bg-ink-900 px-[18px] py-[9px] text-[15px] text-white transition-colors hover:bg-ink-700"
            >
              Voir le projet
            </Link>
            <Link
              href="/realisations"
              className="whitespace-nowrap rounded-full border border-ink-900 px-[18px] py-[8px] text-[15px] text-ink-900 transition-colors hover:bg-ink-900 hover:text-white"
            >
              Toutes nos réalisations
            </Link>
          </div>
        </Reveal>
        <Reveal delay={0.15} className="mt-10 w-full px-4 md:mt-12 md:px-6">
          <Image
            src={r.hero.src}
            alt={r.hero.alt}
            width={r.hero.width}
            height={r.hero.height}
            sizes="(min-width: 1024px) 1000px, 100vw"
            className="mx-auto w-full max-w-[1000px] translate-y-[3%]"
          />
        </Reveal>
      </section>
    </div>
  )
}
