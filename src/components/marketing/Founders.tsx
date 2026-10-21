import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Container } from '@/components/layout/Container'
import { Reveal } from '@/components/ui/Reveal'
import { founders, type Founder } from '@/lib/team'

// Section « Les fondateurs », façon page Leadership d'apple.com : grand
// portrait vertical, nom, rôle. Sans photo, monogramme argenté sur fond
// gris clair, dans la palette du site.

function Portrait({ f, priority }: { f: Founder; priority?: boolean }) {
  return (
    <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] bg-gradient-to-b from-surface-overlay to-surface-muted">
      {f.photo ? (
        <Image
          src={f.photo}
          alt={f.name}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover"
        />
      ) : (
        <div className="flex h-full items-center justify-center">
          <span
            className="font-display text-[88px] font-semibold tracking-tighter md:text-[104px]"
            style={{
              background: 'linear-gradient(160deg, #b3b5bb 0%, #4f5257 55%, #1d1d1f 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
            aria-hidden="true"
          >
            {f.initials}
          </span>
        </div>
      )}
    </div>
  )
}

export function Founders({ variant = 'full' }: { variant?: 'full' | 'compact' }) {
  const compact = variant === 'compact'

  return (
    <section id="fondateurs" className={cn('bg-white', compact ? 'py-24 md:py-32' : 'py-20 md:py-28')}>
      <Container>
        <Reveal className="max-w-3xl">
          <h2 className="font-display text-4xl font-semibold tracking-tighter text-text-primary md:text-6xl">
            Les fondateurs.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-text-secondary md:text-xl">
            Une équipe fondatrice installée à Cotonou, qui construit les outils numériques que les entreprises
            africaines méritent.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {founders.map((f, i) => (
            <Reveal key={f.name} delay={i * 0.08}>
              <Portrait f={f} priority={!compact && i === 0} />
              <h3 className="mt-5 font-display text-2xl font-semibold tracking-tight text-text-primary">{f.name}</h3>
              <p className="mt-1 text-[15px] text-text-secondary">{f.role}</p>
            </Reveal>
          ))}
        </div>

        {compact && (
          <Reveal className="mt-12">
            <Link
              href="/about"
              className="inline-flex items-center gap-1 text-[17px] font-medium text-text-primary hover:underline"
            >
              Notre histoire <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        )}
      </Container>
    </section>
  )
}
