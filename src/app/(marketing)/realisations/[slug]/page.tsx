import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowRight, ShieldCheck } from 'lucide-react'

import { Container } from '@/components/layout/Container'
import { Reveal } from '@/components/ui/Reveal'
import { getRealisation, realisations } from '@/lib/realisations'

// Étude de cas d'une réalisation, construite comme une page produit
// apple.com : grand titre sur fond gris clair, visuel produit, vidéo en
// bande noire, chiffres en très gros, étapes, galerie, puis sécurité.

export function generateStaticParams() {
  return realisations.map((r) => ({ slug: r.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const r = getRealisation(slug)
  if (!r) return {}
  return {
    title: `${r.title} — Réalisation`,
    description: r.summary,
    openGraph: { title: `${r.title} · Orbix Labs`, description: r.tagline, images: [{ url: r.cover, width: 1800, height: 1012 }] },
  }
}

export default async function RealisationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const r = getRealisation(slug)
  if (!r) notFound()

  return (
    <article className="bg-white">
      {/* ── En-tête ─────────────────────────────────────────── */}
      <section className="overflow-hidden pt-28 md:pt-36" style={{ backgroundColor: r.tint }}>
        <Container className="text-center">
          <Reveal>
            <Link href="/realisations" className="text-sm text-text-secondary hover:text-text-primary">
              Réalisations
            </Link>
            <p className="mt-6 text-sm font-semibold uppercase tracking-[0.14em] text-text-muted">
              {r.sector} · {r.place}
            </p>
            <h1 className="mx-auto mt-3 max-w-4xl font-display text-[44px] font-semibold leading-[1.02] tracking-tightest text-text-primary md:text-[80px]">
              {r.title}
            </h1>
            <p className="mx-auto mt-4 max-w-2xl font-display text-[21px] tracking-tight text-text-primary/80 md:text-[28px]">
              {r.tagline}
            </p>
            <p className="mt-4 text-[15px] text-text-secondary">Pour la {r.client}</p>
            <span className="mt-6 inline-flex items-center gap-2 rounded-full border border-text-primary/15 bg-white px-4 py-1.5 text-[13px] text-text-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-text-primary" />
              {r.status.label}
            </span>
          </Reveal>
          <Reveal delay={0.15} className="mt-14 md:mt-16">
            <Image
              src={r.hero.src}
              alt={r.hero.alt}
              width={r.hero.width}
              height={r.hero.height}
              priority
              sizes="(min-width: 1024px) 1100px, 100vw"
              className="mx-auto w-full max-w-[1100px] translate-y-[2%]"
            />
          </Reveal>
        </Container>
      </section>

      {/* ── Résumé ──────────────────────────────────────────── */}
      <section className="py-24 md:py-32">
        <Container className="max-w-3xl">
          <Reveal>
            <p className="font-display text-[26px] font-semibold leading-snug tracking-tight text-text-primary md:text-[36px]">
              {r.summary}
            </p>
          </Reveal>
        </Container>
      </section>

      {/* ── Vidéo ───────────────────────────────────────────── */}
      {r.video && (
        <section className="bg-black px-3 py-3">
          <video
            className="mx-auto aspect-video w-full max-w-6xl rounded-[20px] object-cover"
            src={r.video.src}
            poster={r.video.poster}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-label={`Teaser vidéo du projet ${r.title}`}
          />
        </section>
      )}

      {/* ── Le problème ─────────────────────────────────────── */}
      <section className="py-24 md:py-32">
        <Container>
          <Reveal className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-text-muted">Le problème</p>
            <h2 className="mt-3 font-display text-4xl font-semibold tracking-tighter text-text-primary md:text-6xl">
              Un registre papier.
              <br />
              <span className="text-text-muted">Impossible à vérifier.</span>
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-text-secondary">{r.problem.intro}</p>
          </Reveal>
          <div className="mt-16 grid gap-10 md:grid-cols-3">
            {r.problem.stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.08}>
                <p className="font-display text-7xl font-semibold tracking-tightest text-text-primary md:text-8xl">{s.value}</p>
                <p className="mt-3 max-w-xs text-lg text-text-secondary">{s.label}</p>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-14 max-w-3xl">
            <p className="text-lg leading-relaxed text-text-secondary">{r.problem.text}</p>
          </Reveal>
        </Container>
      </section>

      {/* ── La solution : le parcours ───────────────────────── */}
      <section className="bg-surface-overlay py-24 md:py-32">
        <Container>
          <Reveal className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-text-muted">La solution</p>
            <h2 className="mt-3 font-display text-4xl font-semibold tracking-tighter text-text-primary md:text-6xl">
              Sept étapes.
              <br />
              <span className="text-text-muted">Chaque dose tracée.</span>
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {r.steps.map((s, i) => (
              <Reveal key={s.title} delay={(i % 4) * 0.08} className="rounded-[28px] bg-white p-7">
                <span className="font-display text-5xl font-semibold tracking-tighter text-surface-muted">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-5 font-display text-xl font-semibold tracking-tight text-text-primary">{s.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-text-secondary">{s.text}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Galerie ─────────────────────────────────────────── */}
      <section className="py-24 md:py-32">
        <Container>
          <Reveal className="max-w-3xl">
            <h2 className="font-display text-4xl font-semibold tracking-tighter text-text-primary md:text-6xl">En images.</h2>
          </Reveal>
          <div className="mt-14 grid gap-x-6 gap-y-14 md:grid-cols-2">
            {r.gallery.map((g, i) => (
              <Reveal key={g.src} delay={(i % 2) * 0.08} className={i === 0 ? 'md:col-span-2' : ''}>
                <figure>
                  <div className="overflow-hidden rounded-[24px] bg-surface-overlay">
                    <Image
                      src={g.src}
                      alt={g.caption}
                      width={g.width}
                      height={g.height}
                      sizes={i === 0 ? '(min-width: 1024px) 1200px, 100vw' : '(min-width: 768px) 50vw, 100vw'}
                      className="w-full"
                    />
                  </div>
                  <figcaption className="mt-4 text-[15px] text-text-secondary">{g.caption}</figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
          <p className="mt-12 text-sm text-text-muted">{r.disclaimer}</p>
        </Container>
      </section>

      {/* ── Lutte contre la fraude ──────────────────────────── */}
      <section className="bg-black py-24 text-white md:py-32">
        <Container>
          <Reveal className="max-w-3xl">
            <ShieldCheck className="h-9 w-9" strokeWidth={1.4} />
            <h2 className="mt-6 font-display text-4xl font-semibold tracking-tighter md:text-6xl">
              Conçue pour que la fraude
              <br />
              <span className="text-white/50">ne passe pas inaperçue.</span>
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-x-10 gap-y-10 md:grid-cols-2">
            {r.fraud.map((f, i) => (
              <Reveal key={f.risk} delay={(i % 2) * 0.08} className="border-t border-white/15 pt-6">
                <h3 className="font-display text-xl font-semibold tracking-tight">{f.risk}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-white/60">{f.answer}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ── En chiffres + technologies ──────────────────────── */}
      <section className="py-24 md:py-32">
        <Container>
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {r.figures.map((f, i) => (
              <Reveal key={f.label} delay={i * 0.08}>
                <p className="font-display text-6xl font-semibold tracking-tightest text-text-primary">{f.value}</p>
                <p className="mt-2 text-[15px] text-text-secondary">{f.label}</p>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-16">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-text-muted">Technologies</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {r.stack.map((t) => (
                <span key={t} className="rounded-full bg-surface-overlay px-4 py-1.5 text-sm text-text-primary">
                  {t}
                </span>
              ))}
            </div>
          </Reveal>
          <Reveal className="mt-16 rounded-[28px] bg-surface-overlay p-8 md:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-text-muted">Où en est le projet</p>
            <p className="mt-3 font-display text-2xl font-semibold tracking-tight text-text-primary">{r.status.text}</p>
            {r.status.remaining && <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-text-secondary">{r.status.remaining}</p>}
          </Reveal>
        </Container>
      </section>

      {/* ── Appel à l'action ────────────────────────────────── */}
      <section className="bg-black py-24 text-center text-white md:py-32">
        <Container className="max-w-2xl">
          <Reveal>
            <h2 className="font-display text-3xl font-semibold tracking-tight md:text-5xl">Un projet similaire ?</h2>
            <p className="mt-4 text-white/60 md:text-lg">Administration, santé, finance : parlons de ce que vous voulez digitaliser.</p>
            <Link
              href="/contact"
              className="mt-9 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-[16px] font-medium text-black transition-colors hover:bg-white/85"
            >
              Nous contacter <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </Container>
      </section>
    </article>
  )
}
