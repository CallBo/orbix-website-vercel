import Image from 'next/image'

import { cn } from '@/lib/utils'

// Logo officiel Orbix Labs — ce sont les fichiers de marque fournis
// (zip "Orbix_Labs_Logos_Individuels"), simplement détourés sur fond
// transparent, PAS un logo redessiné :
// - logo-symbol-silver.png / logo-wordmark-light.png : depuis
//   02_symbole_seul_fond_sombre.png et 03_wordmark_ORBIX_LABS.png, en
//   version argentée (palette noir / blanc / argent du site). À utiliser
//   sur fond sombre (nav, Hero, bandes noires).
// - logo-symbol-ink.png / logo-wordmark-ink.png : depuis
//   04_logo_version_claire.png, en version encre. À utiliser sur fond
//   clair (footer, espaces client et admin).
//
// `variant="mono"` = version argentée pour fond sombre ;
// `variant="default"` = version encre pour fond clair.

type Variant = 'default' | 'mono'

const SYMBOL = {
  mono: { src: '/logo-symbol-silver.png', width: 591, height: 434 },
  default: { src: '/logo-symbol-ink.png', width: 175, height: 132 },
} as const

const WORDMARK = {
  mono: { src: '/logo-wordmark-light.png', width: 774, height: 175 },
  default: { src: '/logo-wordmark-ink.png', width: 242, height: 65 },
} as const

export function OrbixLogo({ className, variant = 'default' }: { className?: string; variant?: Variant }) {
  const s = SYMBOL[variant]
  return (
    <Image
      src={s.src}
      alt="Orbix Labs"
      width={s.width}
      height={s.height}
      priority
      className={cn('w-auto object-contain', className)}
    />
  )
}

export function OrbixWordmark({ className, variant = 'default' }: { className?: string; variant?: Variant }) {
  const w = WORDMARK[variant]
  return (
    <Image
      src={w.src}
      alt="Orbix Labs"
      width={w.width}
      height={w.height}
      priority
      className={cn('w-auto object-contain', className)}
    />
  )
}

// Symbole + wordmark côte à côte, pour les en-têtes (nav, footer, sidebars).
export function OrbixLockup({ className, variant = 'default' }: { className?: string; variant?: Variant }) {
  return (
    <span className={cn('flex items-center gap-2.5', className)}>
      <OrbixLogo variant={variant} className="h-6" />
      <OrbixWordmark variant={variant} className="h-[18px]" />
    </span>
  )
}
