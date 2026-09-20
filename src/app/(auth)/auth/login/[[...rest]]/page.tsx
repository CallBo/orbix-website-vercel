import type { Metadata } from 'next'
import { SignIn } from '@clerk/nextjs'

import { clerkAppearance } from '@/lib/clerk-appearance'

export const metadata: Metadata = {
  title: 'Connexion',
}

export default function LoginPage() {
  return <SignIn appearance={clerkAppearance} path="/auth/login" signUpUrl="/auth/register" />
}
