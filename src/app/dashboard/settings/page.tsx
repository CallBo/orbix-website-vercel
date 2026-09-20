import type { Metadata } from 'next'
import { UserProfile } from '@clerk/nextjs'

export const metadata: Metadata = { title: 'Paramètres' }

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <h1 className="font-display text-3xl font-bold text-white">Paramètres</h1>
      <div className="flex justify-center">
        <UserProfile
          appearance={{
            variables: {
              colorPrimary: '#7b30ff',
              colorBackground: '#0d0d14',
              colorText: '#ffffff',
              colorTextSecondary: '#a0a0b8',
              colorInputBackground: '#12121c',
              colorInputText: '#ffffff',
            },
            elements: {
              rootBox: 'w-full',
              card: 'bg-surface-raised border border-surface-border shadow-none',
            },
          }}
        />
      </div>
    </div>
  )
}
