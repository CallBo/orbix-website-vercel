import type { Metadata } from 'next'
import { UserProfile } from '@clerk/nextjs'

export const metadata: Metadata = { title: 'Paramètres' }

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <h1 className="font-display text-3xl font-bold text-text-primary">Paramètres</h1>
      <div className="flex justify-center">
        <UserProfile
          appearance={{
            variables: {
              colorPrimary: '#2f6fed',
              colorBackground: '#fbfbfd',
              colorText: '#1d1d1f',
              colorTextSecondary: '#6e6e73',
              colorInputBackground: '#ffffff',
              colorInputText: '#1d1d1f',
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
