import type { Metadata } from 'next'

import { NewProjectForm } from '@/components/admin/NewProjectForm'
import { Card } from '@/components/ui/Card'
import { usersApi } from '@/lib/api'

export const metadata: Metadata = { title: 'Admin — Nouveau projet' }

async function safeLoadClients() {
  try {
    const res = await usersApi.listClients()
    return { clients: res.data, error: false }
  } catch {
    return { clients: [], error: true }
  }
}

export default async function NewProjectPage() {
  const { clients, error } = await safeLoadClients()

  return (
    <div className="max-w-xl space-y-6">
      <h1 className="font-display text-3xl font-bold text-white">Nouveau projet</h1>
      {error ? (
        <Card className="border-warning/30 bg-warning/10 text-sm text-warning">
          orbix-api n&apos;est pas joignable — impossible de charger la liste des clients.
        </Card>
      ) : (
        <NewProjectForm clients={clients} />
      )}
    </div>
  )
}
