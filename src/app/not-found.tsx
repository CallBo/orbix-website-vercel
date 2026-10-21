import Link from 'next/link'

import { Button } from '@/components/ui/Button'
import { OrbixLogo } from '@/components/layout/OrbixLogo'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-surface-base px-4 text-center">
      <OrbixLogo className="h-12 opacity-60" />
      <div>
        <h1 className="font-display text-2xl font-semibold text-text-primary">Page introuvable</h1>
        <p className="mt-2 text-sm text-text-secondary">Cette page n&apos;existe pas ou a été déplacée.</p>
      </div>
      <Button variant="secondary" asChild>
        <Link href="/">Retour à l&apos;accueil</Link>
      </Button>
    </div>
  )
}
