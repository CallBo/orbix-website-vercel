import Image from 'next/image'
import Link from 'next/link'

import { cn } from '@/lib/utils'
import { OrbixLogo } from '@/components/layout/OrbixLogo'
import { Reveal } from '@/components/ui/Reveal'

// Page d'accueil construite comme apple.com : une succession de grands
// panneaux pleine largeur, un par service, avec une vraie photo en plein
// fond (Unsplash, licence libre, voir public/photos/CREDITS.md). L'interface
// reste noir / blanc / argent : la couleur vient uniquement des photos,
// comme sur apple.com. Texte en bas sur un fondu sombre, pour garder les
// sujets des photos visibles. Damier 2 × 2 sur ordinateur pour les quatre
// derniers.

type PanelProps = {
  name: string
  tagline: string
  photo: string
  alt: string
  position?: string
  primary: { label: string; href: string }
  secondary?: { label: string; href: string }
  size: 'full' | 'half'
}

function Panel({ name, tagline, photo, alt, position = 'center', primary, secondary, size }: PanelProps) {
  const full = size === 'full'

  return (
    <section
      className={cn(
        'group relative flex flex-col items-center justify-end overflow-hidden bg-black text-center text-white',
        full ? 'h-[600px] md:h-[720px]' : 'h-[520px] md:h-[620px]'
      )}
    >
      <Image
        src={photo}
        alt={alt}
        fill
        sizes={full ? '100vw' : '(min-width: 768px) 50vw, 100vw'}
        className="object-cover transition-transform duration-[1600ms] ease-apple group-hover:scale-[1.03]"
        style={{ objectPosition: position }}
      />
      {/* Fondu pour la lisibilité du texte, discret en haut, fort en bas */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/10" />

      <Reveal className={cn('relative z-10 px-6', full ? 'pb-14 md:pb-16' : 'pb-11 md:pb-14')}>
        <h2
          className={cn(
            'flex items-center justify-center gap-[0.18em] font-display font-semibold tracking-tighter',
            full ? 'text-[40px] md:text-[56px]' : 'text-[34px] md:text-[44px]'
          )}
        >
          <OrbixLogo variant="mono" className="h-[0.78em]" />
          {name}
        </h2>
        <p
          className={cn(
            'mx-auto mt-1 max-w-md font-display tracking-tight text-white/90',
            full ? 'text-[21px] md:text-[28px]' : 'text-[19px] md:text-[24px]'
          )}
        >
          {tagline}
        </p>
        <div className="mt-5 flex items-center justify-center gap-3.5">
          <Link
            href={primary.href}
            className="whitespace-nowrap rounded-full bg-white px-[18px] py-[9px] text-[15px] text-black transition-colors hover:bg-white/85"
          >
            {primary.label}
          </Link>
          {secondary && (
            <Link
              href={secondary.href}
              className="whitespace-nowrap rounded-full border border-white/85 px-[18px] py-[8px] text-[15px] text-white backdrop-blur-sm transition-colors hover:bg-white hover:text-black"
            >
              {secondary.label}
            </Link>
          )}
        </div>
      </Reveal>
    </section>
  )
}

const contact = { label: 'Démarrer', href: '/contact' }

export function ProductPanels() {
  return (
    <div className="space-y-3 bg-white p-3">
      <Panel
        size="full"
        name="Software"
        tagline="Votre idée. En production."
        photo="/photos/software.webp"
        alt="Développeur au casque travaillant sur du code devant son écran"
        position="50% 40%"
        primary={{ label: 'Découvrir', href: '/services#software' }}
        secondary={contact}
      />

      <Panel
        size="full"
        name="AI"
        tagline="L’IA qui connaît votre entreprise."
        photo="/photos/ai.webp"
        alt="Homme concentré face à son écran d’ordinateur"
        position="18% 35%"
        primary={{ label: 'Découvrir', href: '/services#ai' }}
        secondary={{ label: 'Essayer', href: '/auth/register' }}
      />

      <div className="grid gap-3 md:grid-cols-2">
        <Panel
          size="half"
          name="Cloud"
          tagline="Toujours en ligne. Toujours surveillé."
          photo="/photos/cloud.webp"
          alt="Centre de données moderne aux armoires de serveurs blanches"
          position="50% 30%"
          primary={{ label: 'Découvrir', href: '/services#cloud' }}
          secondary={contact}
        />
        <Panel
          size="half"
          name="Sécurité"
          tagline="Vos systèmes. Sous protection."
          photo="/photos/securite.webp"
          alt="Baie de serveurs et équipements réseau"
          position="40% 50%"
          primary={{ label: 'Découvrir', href: '/services#security' }}
          secondary={{ label: 'Audit', href: '/contact' }}
        />
        <Panel
          size="half"
          name="Automatisation"
          tagline="Moins de tâches. Plus de temps."
          photo="/photos/automatisation.webp"
          alt="Câbles réseau colorés connectés à des serveurs"
          position="50% 50%"
          primary={{ label: 'Découvrir', href: '/services#automation' }}
          secondary={contact}
        />
        <Panel
          size="half"
          name="Marketplace"
          tagline="Des modules prêts à brancher."
          photo="/photos/commercante.webp"
          alt="Commerçante souriante tenant son téléphone devant son étal"
          position="45% 35%"
          primary={{ label: 'Découvrir', href: '/services#marketplace' }}
        />
      </div>
    </div>
  )
}
