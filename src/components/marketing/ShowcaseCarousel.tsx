'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Pause, Play } from 'lucide-react'

import { cn } from '@/lib/utils'
import { ACADEMY_URL } from '@/lib/constants'
import { Reveal } from '@/components/ui/Reveal'

// Carrousel façon "Endless entertainment." d'apple.com : grandes cartes
// photo (Unsplash, licence libre) qui défilent seules (toutes les 5 s), la carte voisine dépasse
// sur les côtés, points de pagination + bouton pause. Défilement natif
// (scroll-snap), donc le glisser au doigt marche sans code en plus.
// L'auto-défilement s'arrête si l'utilisateur a demandé moins d'animations.

const slides = [
  {
    label: 'Espace client',
    title: 'Tous vos projets. Un seul écran.',
    text: 'Avancement, fichiers, échanges avec l’équipe — en temps réel.',
    cta: { label: 'Découvrir', href: '/auth/register' },
    photo: '/photos/equipe.webp',
    alt: 'Équipe réunie autour d’une table de réunion',
    position: '50% 40%',
  },
  {
    label: 'Orbix Academy',
    title: 'Apprendre à coder. Pour de vrai.',
    text: 'Cours vidéo, exercices et suivi de progression.',
    cta: { label: 'Voir les cours', href: ACADEMY_URL },
    photo: '/photos/academy.webp',
    alt: 'Étudiante travaillant sur son ordinateur portable',
    position: '35% 35%',
  },
  {
    label: 'Paiement mobile',
    title: 'Payer en un geste.',
    text: 'Mobile Money ou carte, factures toujours à jour.',
    cta: { label: 'En savoir plus', href: '/services' },
    photo: '/photos/telephone.webp',
    alt: 'Homme souriant consultant son smartphone',
    position: '50% 30%',
  },
]

export function ShowcaseCarousel() {
  const trackRef = useRef<HTMLDivElement>(null)
  const [index, setIndex] = useState(0)
  const [playing, setPlaying] = useState(true)

  const goTo = useCallback((i: number) => {
    const track = trackRef.current
    const card = track?.children[i] as HTMLElement | undefined
    if (!track || !card) return
    track.scrollTo({ left: card.offsetLeft - (track.clientWidth - card.clientWidth) / 2, behavior: 'smooth' })
  }, [])

  // Index courant d'après la position de défilement (glisser au doigt inclus)
  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const onScroll = () => {
      const center = track.scrollLeft + track.clientWidth / 2
      let best = 0
      let bestDist = Infinity
      Array.from(track.children).forEach((child, i) => {
        const el = child as HTMLElement
        const d = Math.abs(el.offsetLeft + el.clientWidth / 2 - center)
        if (d < bestDist) {
          bestDist = d
          best = i
        }
      })
      setIndex(best)
    }
    track.addEventListener('scroll', onScroll, { passive: true })
    return () => track.removeEventListener('scroll', onScroll)
  }, [])

  // Auto-défilement
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) setPlaying(false)
  }, [])
  useEffect(() => {
    if (!playing) return
    const t = setInterval(() => goTo((index + 1) % slides.length), 5000)
    return () => clearInterval(t)
  }, [playing, index, goTo])

  return (
    <section className="overflow-hidden bg-white py-20 md:py-24">
      <Reveal>
        <h2 className="text-center font-display text-[32px] font-semibold tracking-tighter text-text-primary md:text-[48px]">
          Tout Orbix. Un seul espace.
        </h2>
      </Reveal>

      <div
        ref={trackRef}
        className="mt-10 flex snap-x snap-mandatory gap-3 overflow-x-auto px-[7vw] pb-2 [scrollbar-width:none] md:px-[10vw] [&::-webkit-scrollbar]:hidden"
      >
        {slides.map((s, i) => (
          <article
            key={s.label}
            className="relative h-[540px] w-[86vw] flex-shrink-0 snap-center overflow-hidden rounded-[28px] bg-black text-white md:h-[560px] md:w-[80vw] md:max-w-[1100px]"
          >
            <Image
              src={s.photo}
              alt={s.alt}
              fill
              sizes="(min-width: 768px) 80vw, 86vw"
              className="object-cover"
              style={{ objectPosition: s.position }}
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent md:bg-gradient-to-r md:from-black/75 md:via-black/25 md:to-transparent" />

            {/* Texte, en bas à gauche, sur un fondu noir */}
            <div className="absolute inset-x-0 bottom-0 px-7 pb-8 md:max-w-[50%] md:px-12 md:pb-12">
              <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-white/55">{s.label}</p>
              <h3 className="mt-2 font-display text-[28px] font-semibold leading-[1.08] tracking-tighter md:text-[40px]">
                {s.title}
              </h3>
              <p className="mt-2 text-[15px] text-white/70 md:text-[17px]">{s.text}</p>
              <Link
                href={s.cta.href}
                tabIndex={i === index ? 0 : -1}
                className="mt-5 inline-block rounded-full bg-white px-[18px] py-[9px] text-[15px] text-black transition-colors hover:bg-white/85"
              >
                {s.cta.label}
              </Link>
            </div>
          </article>
        ))}
      </div>

      {/* Pagination + pause */}
      <div className="mt-7 flex items-center justify-center gap-4">
        <div className="flex items-center gap-2.5 rounded-full bg-surface-overlay px-4 py-3">
          {slides.map((s, i) => (
            <button
              key={s.label}
              onClick={() => goTo(i)}
              aria-label={`Afficher : ${s.label}`}
              className={cn(
                'h-2 rounded-full transition-all duration-500',
                i === index ? 'w-8 bg-ink-900' : 'w-2 bg-text-muted/50 hover:bg-text-muted'
              )}
            />
          ))}
        </div>
        <button
          onClick={() => setPlaying((p) => !p)}
          aria-label={playing ? 'Mettre en pause le défilement' : 'Reprendre le défilement'}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-overlay text-text-primary transition-colors hover:bg-surface-muted"
        >
          {playing ? <Pause className="h-4 w-4 fill-current" /> : <Play className="ml-0.5 h-4 w-4 fill-current" />}
        </button>
      </div>
    </section>
  )
}
