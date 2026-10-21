import type { Metadata } from 'next'

import { NewInvoiceForm } from '@/components/admin/NewInvoiceForm'
import { Card } from '@/components/ui/Card'
import { usersApi, projectsApi } from '@/lib/api'

export const metadata: Metadata = { title: 'Admin — Nouvelle facture' }

async function safeLoad() {
  try {
    const [clientsRes, projectsRes] = await Promise.all([usersApi.listClients(), projectsApi.listAll()])
    return { clients: clientsRes.data, projects: projectsRes.data, error: false }
  } catch {
    return { clients: [], projects: [], error: true }
  }
}

export default async function NewInvoicePage() {
  const { clients, projects, error } = await safeLoad()

  return (
    <div className="max-w-xl space-y-6">
      <h1 className="font-display text-3xl font-bold text-text-primary">Nouvelle facture</h1>
      {error ? (
        <Card className="border-warning/30 bg-warning/10 text-sm text-warning">
          orbix-api n&apos;est pas joignable — impossible de charger les données.
        </Card>
      ) : (
        <NewInvoiceForm clients={clients} projects={projects} />
      )}
    </div>
  )
}
