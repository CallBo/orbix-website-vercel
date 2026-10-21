import type { Metadata } from 'next'
import Link from 'next/link'
import { Users, FolderKanban, Wallet, Receipt } from 'lucide-react'

import { StatCard } from '@/components/dashboard/StatCard'
import { RevenueBarChart } from '@/components/admin/RevenueBarChart'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { usersApi, projectsApi, invoicesApi, type ApiProject, type ApiInvoice, type ApiClient } from '@/lib/api'

export const metadata: Metadata = { title: 'Admin — Vue d’ensemble' }

interface OverviewData {
  clients: ApiClient[]
  projects: ApiProject[]
  invoices: ApiInvoice[]
  error: boolean
}

async function safeLoad(): Promise<OverviewData> {
  try {
    const [clientsRes, projectsRes, invoicesRes] = await Promise.all([
      usersApi.listClients(),
      projectsApi.listAll(),
      invoicesApi.listAll(),
    ])
    return { clients: clientsRes.data, projects: projectsRes.data, invoices: invoicesRes.data, error: false }
  } catch {
    return { clients: [], projects: [], invoices: [], error: true }
  }
}

// Regroupe les factures payées par mois (les 6 derniers) — pas d'endpoint
// "stats" dédié côté API, calculé ici à partir de la liste complète. À
// revoir si le volume de factures grossit beaucoup (paginer + agréger
// côté serveur plutôt que de tout rapatrier).
function computeMonthlyRevenue(invoices: ApiInvoice[]) {
  const now = new Date()
  const months: { key: string; label: string; amount: number }[] = []

  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1)
    months.push({
      key: `${d.getFullYear()}-${d.getMonth()}`,
      label: d.toLocaleDateString('fr-FR', { month: 'short' }),
      amount: 0,
    })
  }

  for (const invoice of invoices) {
    if (invoice.status !== 'PAYEE' || !invoice.paidAt) continue
    const paid = new Date(invoice.paidAt)
    const key = `${paid.getFullYear()}-${paid.getMonth()}`
    const bucket = months.find((m) => m.key === key)
    if (bucket) bucket.amount += invoice.amount
  }

  return months.map((m) => ({ month: m.label, amount: m.amount }))
}

export default async function AdminOverviewPage() {
  const { clients, projects, invoices, error } = await safeLoad()

  const activeProjects = projects.filter((p) => p.status !== 'TERMINE' && p.status !== 'ARCHIVE')
  const pendingInvoices = invoices.filter((i) => i.status !== 'PAYEE')
  const totalRevenue = invoices.filter((i) => i.status === 'PAYEE').reduce((sum, i) => sum + i.amount, 0)
  const monthlyRevenue = computeMonthlyRevenue(invoices)

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-bold text-text-primary">Vue d&apos;ensemble</h1>
        <p className="mt-1 text-text-secondary">L&apos;activité de l&apos;agence en un coup d&apos;œil.</p>
      </div>

      {error && (
        <Card className="border-warning/30 bg-warning/10 text-sm text-warning">
          orbix-api n&apos;est pas joignable pour l&apos;instant — aucune donnée à afficher.
        </Card>
      )}

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard title="Clients" value={clients.length} icon={Users} />
        <StatCard title="Projets actifs" value={activeProjects.length} icon={FolderKanban} />
        <StatCard title="Revenus encaissés" value={`${(totalRevenue / 1000000).toFixed(1)}M FCFA`} icon={Wallet} />
        <StatCard title="Factures en attente" value={pendingInvoices.length} icon={Receipt} />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
        <Card>
          <h2 className="mb-6 font-display text-lg font-semibold text-text-primary">Revenus par mois</h2>
          <RevenueBarChart data={monthlyRevenue} />
        </Card>

        <Card className="p-0">
          <h2 className="px-6 pt-6 font-display text-lg font-semibold text-text-primary">Projets récents</h2>
          <div className="mt-4 divide-y divide-surface-border">
            {projects.length === 0 ? (
              <p className="px-6 pb-6 text-sm text-text-muted">Aucun projet pour l&apos;instant.</p>
            ) : (
              projects.slice(0, 4).map((project) => (
                <Link
                  key={project.id}
                  href="/admin/projects"
                  className="flex items-center justify-between px-6 py-3 text-sm hover:bg-surface-overlay"
                >
                  <span className="truncate text-text-primary">{project.title}</span>
                  <Badge size="sm">{project.progress}%</Badge>
                </Link>
              ))
            )}
          </div>
        </Card>
      </div>
    </div>
  )
}
