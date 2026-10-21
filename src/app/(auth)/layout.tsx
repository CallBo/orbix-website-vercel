import Link from 'next/link'

import { OrbixLogo, OrbixWordmark } from '@/components/layout/OrbixLogo'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-surface-base px-4 py-16">
      <Link href="/" className="mb-10 flex items-center gap-2.5">
        <OrbixLogo className="h-9" />
        <OrbixWordmark className="h-[20px]" />
      </Link>
      {children}
    </div>
  )
}
