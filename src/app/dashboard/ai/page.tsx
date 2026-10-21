import type { Metadata } from 'next'

import { AIChatInterface } from '@/components/dashboard/AIChatInterface'

export const metadata: Metadata = { title: 'Orbix AI' }

export default function AiPage() {
  return (
    <div className="space-y-6">
      <h1 className="font-display text-3xl font-bold text-text-primary">Orbix AI</h1>
      <AIChatInterface />
    </div>
  )
}
