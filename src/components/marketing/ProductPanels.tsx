import Link from 'next/link'

import { cn } from '@/lib/utils'
import { OrbixLogo } from '@/components/layout/OrbixLogo'
import { Reveal } from '@/components/ui/Reveal'
import { LaptopFrame, PhoneFrame } from './Devices'
import { CodeScreen, ChatScreen, DashboardScreen } from './Screens'
import { SecurityVisual, AutomationVisual } from './ServiceVisuals'

// Page d'accueil construite comme apple.com : une succession de grands
// panneaux pleine largeur, un par service, qui alternent gris très clair
// (#f5f5f7) et noir. Chaque panneau suit la même grammaire : symbole Orbix
// + nom du service en gros, une phrase, deux boutons pilule, puis un grand
// visuel "produit" (interface Orbix dans un appareil) qui déborde vers le
// bas. Sur ordinateur, les quatre derniers forment un damier 2 × 2.

type Tone = 'light' | 'dark'

type PanelProps = {
  tone: Tone
  name: string
  tagline: string
  primary: { label: string; href: string }
  secondary?: { label: string; href: string }
  visual: React.ReactNode
  size: 'full' | 'half'
}

function Panel({ tone, name, tagline, primary, secondary, visual, size }: PanelProps) {
  const dark = tone === 'dark'
  const full = size === 'full'

  return (
    <section
      className={cn(
        'relative flex flex-col items-center overflow-hidden text-center',
        dark ? 'bg-black text-white' : 'bg-surface-overlay text-text-primary',
        full ? 'min-h-[520px] pt-12 md:min-h-[720px] md:pt-16' : 'min-h-[460px] pt-11 md:min-h-[620px] md:pt-14'
      )}
    >
      <Reveal className="relative z-10 px-6">
        <h2
          className={cn(
            'flex items-center justify-center gap-[0.18em] font-display font-semibold tracking-tighter',
            full ? 'text-[40px] md:text-[56px]' : 'text-[36px] md:text-[44px]'
          )}
        >
          <OrbixLogo variant={dark ? 'mono' : 'default'} className="h-[0.78em]" />
          {name}
        </h2>
        <p
          className={cn(
            'mx-auto mt-1 max-w-md font-display tracking-tight',
            full ? 'text-[21px] md:text-[28px]' : 'text-[19px] md:text-[24px]',
            dark ? 'text-white/85' : 'text-text-primary/85'
          )}
        >
          {tagline}
        </p>
        <div className="mt-5 flex items-center justify-center gap-3.5">
          <Link
            href={primary.href}
            className={cn(
              'whitespace-nowrap rounded-full px-[18px] py-[9px] text-[15px] font-normal transition-colors',
              dark ? 'bg-white text-black hover:bg-white/85' : 'bg-ink-900 text-white hover:bg-ink-700'
            )}
          >
            {primary.label}
          </Link>
          {secondary && (
            <Link
              href={secondary.href}
              className={cn(
                'whitespace-nowrap rounded-full border px-[18px] py-[8px] text-[15px] font-normal transition-colors',
                dark
                  ? 'border-white/80 text-white hover:bg-white hover:text-black'
                  : 'border-ink-900 text-ink-900 hover:bg-ink-900 hover:text-white'
              )}
            >
              {secondary.label}
            </Link>
          )}
        </div>
      </Reveal>

      <Reveal delay={0.15} className={cn('relative mt-auto w-full px-4 md:px-6', full ? 'pt-10 md:pt-12' : 'pt-8 md:pt-10')}>
        <div aria-hidden="true" className="translate-y-[6%]">
          {visual}
        </div>
      </Reveal>
    </section>
  )
}

function ModulesScreen() {
  const mods = ['Paiements', 'Réservations', 'Blog', 'Chat', 'Factures', 'Agenda']
  return (
    <div className="grid grid-cols-2 gap-2 px-3.5">
      {mods.map((m, i) => (
        <div
          key={m}
          className={cn(
            'flex aspect-square flex-col justify-between rounded-2xl p-2.5',
            i === 0 ? 'bg-white text-black' : 'bg-white/[0.08] text-white'
          )}
        >
          <span className={cn('h-5 w-5 rounded-md', i === 0 ? 'bg-black' : 'bg-white/30')} />
          <span className="text-left text-[10px] font-medium">{m}</span>
        </div>
      ))}
    </div>
  )
}

const contact = { label: 'Démarrer', href: '/contact' }

export function ProductPanels() {
  return (
    <div className="space-y-3 bg-white p-3">
      <Panel
        size="full"
        tone="light"
        name="Software"
        tagline="Votre idée. En production."
        primary={{ label: 'Découvrir', href: '/services#software' }}
        secondary={contact}
        visual={
          <LaptopFrame>
            <CodeScreen />
          </LaptopFrame>
        }
      />

      <Panel
        size="full"
        tone="dark"
        name="AI"
        tagline="L’IA qui connaît votre entreprise."
        primary={{ label: 'Découvrir', href: '/services#ai' }}
        secondary={{ label: 'Essayer', href: '/auth/register' }}
        visual={
          <PhoneFrame className="w-[260px] md:w-[290px]">
            <ChatScreen />
          </PhoneFrame>
        }
      />

      <div className="grid gap-3 md:grid-cols-2">
        <Panel
          size="half"
          tone="light"
          name="Cloud"
          tagline="Toujours en ligne. Toujours surveillé."
          primary={{ label: 'Découvrir', href: '/services#cloud' }}
          secondary={contact}
          visual={
            <LaptopFrame className="max-w-[460px]">
              <DashboardScreen />
            </LaptopFrame>
          }
        />
        <Panel
          size="half"
          tone="dark"
          name="Sécurité"
          tagline="Vos systèmes. Sous protection."
          primary={{ label: 'Découvrir', href: '/services#security' }}
          secondary={{ label: 'Audit', href: '/contact' }}
          visual={
            <div className="flex h-[260px] items-center justify-center pb-10">
              <div className="scale-[2.2]">
                <SecurityVisual />
              </div>
            </div>
          }
        />
        <Panel
          size="half"
          tone="dark"
          name="Automatisation"
          tagline="Moins de tâches. Plus de temps."
          primary={{ label: 'Découvrir', href: '/services#automation' }}
          secondary={contact}
          visual={
            <div className="flex h-[260px] items-center justify-center pb-10">
              <div className="scale-[1.9]">
                <AutomationVisual />
              </div>
            </div>
          }
        />
        <Panel
          size="half"
          tone="light"
          name="Marketplace"
          tagline="Des modules prêts à brancher."
          primary={{ label: 'Découvrir', href: '/services#marketplace' }}
          visual={
            <PhoneFrame className="w-[230px]">
              <ModulesScreen />
            </PhoneFrame>
          }
        />
      </div>
    </div>
  )
}
