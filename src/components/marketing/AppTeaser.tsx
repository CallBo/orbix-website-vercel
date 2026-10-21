'use client'

import { useState } from 'react'
import { BadgeCheck, CalendarCheck, Check, Loader2, PlayCircle } from 'lucide-react'

import { cn } from '@/lib/utils'
import { OrbixLogo } from '@/components/layout/OrbixLogo'
import { Reveal } from '@/components/ui/Reveal'

// Teaser de la nouvelle app Orbix (citoyens + entreprises du Bénin),
// façon annonce de lancement Apple : panneau noir, grande signature,
// trois fonctions phares, puis inscription à la liste d'attente
// (POST /api/waitlist → orbix-api /v1/leads/waitlist).
// Volontairement sans prix ni promesse commerciale : la grille
// d'abonnement est encore à tester auprès des entreprises pilotes.

const features = [
  { icon: PlayCircle, title: 'Découvrir', text: 'Chaque entreprise en vidéo, avec sa note et son affluence en direct.' },
  { icon: CalendarCheck, title: 'Réserver', text: 'Rendez-vous et ticket de file d’attente, prévenu sur WhatsApp.' },
  { icon: BadgeCheck, title: 'Le Verdict', text: 'Des avis de vrais clients uniquement. Aucun paiement ne change un classement.' },
]

const sectors = ['Banque & assurance', 'Santé', 'Restauration', 'Commerce', 'Beauté & bien-être', 'Services publics', 'Autre']
const cities = ['Cotonou', 'Abomey-Calavi', 'Porto-Novo', 'Parakou', 'Autre ville']

type Profile = 'particulier' | 'entreprise'
type Status = { kind: 'idle' } | { kind: 'loading' } | { kind: 'done'; already: boolean; name: string } | { kind: 'error'; message: string }

const field =
  'w-full rounded-xl border border-white/15 bg-white/[0.07] px-4 py-3 text-[15px] text-white placeholder:text-white/40 outline-none ring-0 transition focus:border-white/60 focus:bg-white/[0.1] focus:ring-0 focus:ring-offset-0'

export function AppTeaser() {
  const [profile, setProfile] = useState<Profile>('particulier')
  const [status, setStatus] = useState<Status>({ kind: 'idle' })

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const get = (k: string) => (form.get(k) as string | null)?.trim() || undefined
    const payload = {
      profile,
      name: get('name') ?? '',
      contact: get('contact') ?? '',
      city: get('city'),
      company: profile === 'entreprise' ? get('company') : undefined,
      sector: profile === 'entreprise' ? get('sector') : undefined,
    }

    setStatus({ kind: 'loading' })
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const json = (await res.json().catch(() => null)) as { message?: string; alreadyRegistered?: boolean } | null
      if (!res.ok) throw new Error(json?.message ?? 'Une erreur est survenue.')
      setStatus({ kind: 'done', already: Boolean(json?.alreadyRegistered), name: payload.name.split(' ')[0] ?? '' })
    } catch (err) {
      setStatus({ kind: 'error', message: err instanceof Error ? err.message : 'Une erreur est survenue.' })
    }
  }

  return (
    <div className="bg-white px-3 pt-3">
      <section id="app" className="relative overflow-hidden bg-black px-6 py-20 text-white md:py-28">
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(255,255,255,0.12), transparent 70%)' }}
        />

        <div className="relative mx-auto max-w-5xl">
          <Reveal className="text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 px-3.5 py-1 text-[13px] text-white/80">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
              Bientôt au Bénin
            </span>
            <p className="mt-7 flex items-center justify-center gap-2 font-display text-[22px] font-semibold tracking-tight text-white/90 md:text-[26px]">
              <OrbixLogo variant="mono" className="h-[0.9em]" />
              La nouvelle app Orbix
            </p>
            <h2 className="mx-auto mt-3 max-w-4xl font-display text-[42px] font-semibold leading-[1.02] tracking-tightest md:text-[80px]">
              Ici, ce sont les clients qui classent.
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-[19px] leading-relaxed text-white/70 md:text-[22px]">
              Trouvez, réservez et notez les meilleures entreprises du pays. Sans file d’attente, sans mauvaise
              surprise.
            </p>
          </Reveal>

          <div className="mt-16 grid gap-8 md:grid-cols-3 md:gap-6">
            {features.map((f, i) => (
              <Reveal key={f.title} delay={i * 0.08} className="text-center md:text-left">
                <f.icon className="mx-auto h-7 w-7 text-white md:mx-0" strokeWidth={1.5} />
                <h3 className="mt-4 font-display text-[22px] font-semibold tracking-tight">{f.title}</h3>
                <p className="mt-1.5 text-[15px] leading-relaxed text-white/60">{f.text}</p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1} className="mx-auto mt-16 max-w-xl">
            <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-6 backdrop-blur md:p-8">
              {status.kind === 'done' ? (
                <div className="py-6 text-center">
                  <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white text-black">
                    <Check className="h-6 w-6" />
                  </span>
                  <p className="mt-5 font-display text-2xl font-semibold tracking-tight">
                    {status.already ? 'Vous êtes déjà sur la liste.' : `C’est noté${status.name ? `, ${status.name}` : ''} !`}
                  </p>
                  <p className="mt-2 text-[15px] text-white/60">On vous prévient dès le lancement.</p>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="space-y-4">
                  <div>
                    <p className="text-center font-display text-[20px] font-semibold tracking-tight">Soyez parmi les premiers.</p>
                    <p className="mt-1 text-center text-[14px] text-white/55">
                      {profile === 'entreprise'
                        ? 'Entreprises : rejoignez les pilotes du lancement.'
                        : 'Laissez votre contact, on vous prévient au lancement.'}
                    </p>
                  </div>

                  {/* Choix du profil, en contrôle segmenté */}
                  <div className="grid grid-cols-2 rounded-full bg-white/[0.08] p-1" role="radiogroup" aria-label="Je suis">
                    {(['particulier', 'entreprise'] as const).map((p) => (
                      <button
                        key={p}
                        type="button"
                        role="radio"
                        aria-checked={profile === p}
                        onClick={() => setProfile(p)}
                        className={cn(
                          'rounded-full py-2 text-[14px] font-medium transition-colors',
                          profile === p ? 'bg-white text-black' : 'text-white/70 hover:text-white'
                        )}
                      >
                        {p === 'particulier' ? 'Particulier' : 'Entreprise'}
                      </button>
                    ))}
                  </div>

                  <input name="name" required minLength={2} maxLength={80} placeholder="Votre nom" autoComplete="name" className={field} />
                  <input
                    name="contact"
                    required
                    minLength={5}
                    maxLength={120}
                    placeholder="Numéro WhatsApp ou e-mail"
                    autoComplete="tel"
                    inputMode="email"
                    className={field}
                  />

                  {profile === 'entreprise' && (
                    <>
                      <input name="company" required maxLength={120} placeholder="Nom de l’entreprise" autoComplete="organization" className={field} />
                      <select name="sector" required defaultValue="" className={cn(field, 'appearance-none')}>
                        <option value="" disabled className="text-black">
                          Secteur d’activité
                        </option>
                        {sectors.map((s) => (
                          <option key={s} value={s} className="text-black">
                            {s}
                          </option>
                        ))}
                      </select>
                    </>
                  )}

                  <select name="city" defaultValue="" className={cn(field, 'appearance-none')}>
                    <option value="" className="text-black">
                      Ville (facultatif)
                    </option>
                    {cities.map((c) => (
                      <option key={c} value={c} className="text-black">
                        {c}
                      </option>
                    ))}
                  </select>

                  {status.kind === 'error' && <p className="text-center text-[14px] text-red-300">{status.message}</p>}

                  <button
                    type="submit"
                    disabled={status.kind === 'loading'}
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-white py-3 text-[16px] font-medium text-black transition-colors hover:bg-white/85 disabled:opacity-60"
                  >
                    {status.kind === 'loading' && <Loader2 className="h-4 w-4 animate-spin" />}
                    Être prévenu du lancement
                  </button>
                  <p className="text-center text-[12px] text-white/40">
                    Uniquement pour vous informer du lancement. Jamais revendu.
                  </p>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
