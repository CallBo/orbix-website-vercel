import type { Metadata } from 'next'

import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { usersApi } from '@/lib/api'

export const metadata: Metadata = { title: 'Admin — Clients' }

async function safeLoad() {
  try {
    const res = await usersApi.listClients()
    return { clients: res.data, error: false }
  } catch {
    return { clients: [], error: true }
  }
}

export default async function AdminClientsPage() {
  const { clients, error } = await safeLoad()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold text-white">Clients</h1>
      </div>

      {error ? (
        <Card className="border-warning/30 bg-warning/10 text-sm text-warning">
          orbix-api n&apos;est pas joignable pour l&apos;instant.
        </Card>
      ) : clients.length === 0 ? (
        <Card className="text-sm text-text-secondary">Aucun client pour l&apos;instant.</Card>
      ) : (
        <Card className="overflow-x-auto p-0">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-surface-border text-xs uppercase tracking-wide text-text-muted">
                <th className="px-6 py-4 font-medium">Client</th>
                <th className="px-6 py-4 font-medium">Entreprise</th>
                <th className="px-6 py-4 font-medium">Projets</th>
                <th className="px-6 py-4 font-medium">Facturé (payé)</th>
                <th className="px-6 py-4 font-medium">Statut</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-border">
              {clients.map((client) => (
                <tr key={client.id} className="hover:bg-surface-overlay">
                  <td className="px-6 py-4">
                    <p className="font-medium text-white">{client.name}</p>
                    <p className="text-xs text-text-muted">{client.email}</p>
                  </td>
                  <td className="px-6 py-4 text-text-secondary">{client.company ?? '—'}</td>
                  <td className="px-6 py-4 text-text-secondary">{client.projectsCount}</td>
                  <td className="px-6 py-4 text-text-secondary">{client.totalBilled.toLocaleString('fr-FR')} FCFA</td>
                  <td className="px-6 py-4">
                    <Badge variant={client.projectsCount > 0 ? 'success' : 'default'} size="sm">
                      {client.projectsCount > 0 ? 'Actif' : 'Sans projet'}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}
    </div>
  )
}
