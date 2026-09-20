import type { Metadata } from 'next'
import { SignUp } from '@clerk/nextjs'

import { clerkAppearance } from '@/lib/clerk-appearance'

export const metadata: Metadata = {
  title: 'Créer un compte',
}

export default function RegisterPage() {
  return <SignUp appearance={clerkAppearance} path="/auth/register" signInUrl="/auth/login" />
}
