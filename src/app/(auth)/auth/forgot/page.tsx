import type { Metadata } from 'next'
import Link from 'next/link'

import { Button } from '@/components/ui/Button'

export const metadata: Metadata = {
  title: 'Mot de passe oublié',
}

// Clerk gère la réinitialisation directement dans le flux de connexion
// ("Mot de passe oublié ?" sur /auth/login). Cette page reste pour le lien
// direct prévu par le PRD et redirige vers ce flux.
export default function ForgotPasswordPage() {
  return (
    <div className="w-full max-w-sm rounded-2xl border border-surface-border bg-surface-raised p-8 text-center">
      <h1 className="font-display text-lg font-semibold text-white">Mot de passe oublié</h1>
      <p className="mt-2 text-sm text-text-secondary">
        La réinitialisation se fait depuis l&apos;écran de connexion, en cliquant sur
        « Mot de passe oublié ? ».
      </p>
      <Button variant="primary" size="md" className="mt-6 w-full" asChild>
        <Link href="/auth/login">Aller à la connexion</Link>
      </Button>
    </div>
  )
}
