import type { Metadata } from 'next'
import { currentUser } from '@clerk/nextjs/server'
import { FolderKanban, Receipt, Sparkles } from 'lucide-react'
import Link from 'next/link'

import { StatCard } from '@/components/dashboard/StatCard'
import { ProjectProgressCard } from '@/components/dashboard/ProjectProgressCard'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { projectsApi, invoicesApi, toClientProject } from '@/lib/api'

export const metadata: Metadata = {
  title: 'Tableau de bord',
}

async function safeLoad() {
  try {
    const [projectsRes, invoicesRes] = await Promise.all([projectsApi.listMine(), invoicesApi.listMine()])
    return { projects: projectsRes.data, invoices: invoicesRes.data, error: false }
  } catch {
    return { projects: [], invoices: [], error: true }
  }
}

export default async function DashboardPage() {
  const user = await currentUser()
  const { projects, invoices, error } = await safeLoad()

  const activeProjects = projects.filter((p) => p.status !== 'TERMINE' && p.status !== 'ARCHIVE')
  const pendingInvoices = invoices.filter((i) => i.status !== 'PAYEE')

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-bold text-text-primary">
          Bonjour, {user?.firstName ?? 'vous'} 👋
        </h1>
        <p className="mt-1 text-text-secondary">Voici où en sont vos projets aujourd&apos;hui.</p>
      </div>

      {error && (
        <Card className="border-warning/30 bg-warning/10 text-sm text-warning">
          orbix-api n&apos;est pas joignable pour l&apos;instant — impossible de charger tes
          données en ce moment.
        </Card>
      )}

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
        <StatCard title="Projets actifs" value={activeProjects.length} icon={FolderKanban} />
        <StatCard title="Factures en attente" value={pendingInvoices.length} icon={Receipt} />
        <StatCard title="Projets au total" value={projects.length} icon={FolderKanban} />
      </div>

      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-xl font-semibold text-text-primary">Mes projets actifs</h2>
          <Link href="/dashboard/projects" className="text-sm font-medium text-orbix-600 hover:text-orbix-300">
            Voir tout →
          </Link>
        </div>
        {activeProjects.length === 0 && !error ? (
          <p className="text-sm text-text-muted">Aucun projet actif pour l&apos;instant.</p>
        ) : (
          <div className="space-y-3">
            {activeProjects.map((project) => (
              <ProjectProgressCard key={project.id} project={toClientProject(project)} />
            ))}
          </div>
        )}
      </section>

      <div className="grid gap-6 lg:grid-cols-2">
        <section>
          <h2 className="mb-4 font-display text-xl font-semibold text-text-primary">Factures</h2>
          <Card className="divide-y divide-surface-border p-0">
            {invoices.length === 0 ? (
              <p className="p-6 text-sm text-text-muted">Aucune facture pour l&apos;instant.</p>
            ) : (
              invoices.slice(0, 5).map((invoice) => (
                <div key={invoice.id} className="flex items-center justify-between px-6 py-4">
                  <div>
                    <p className="text-sm text-text-primary">{invoice.number}</p>
                    <p className="mt-0.5 text-xs text-text-muted">
                      {invoice.amount.toLocaleString('fr-FR')} FCFA
                    </p>
                  </div>
                  <span className="text-xs text-text-muted">{invoice.status}</span>
                </div>
              ))
            )}
          </Card>
        </section>

        <section>
          <h2 className="mb-4 font-display text-xl font-semibold text-text-primary">Orbix AI</h2>
          <Card className="flex flex-col items-start gap-3">
            <div className="rounded-xl border border-orbix-500/20 bg-orbix-500/10 p-2.5 text-orbix-600">
              <Sparkles className="h-5 w-5" />
            </div>
            <p className="text-sm text-text-secondary">
              Une question sur un projet, un devis ou un point technique ? Orbix AI répond
              directement depuis votre espace.
            </p>
            <Button variant="secondary" size="sm" asChild>
              <Link href="/dashboard/ai">Démarrer une conversation</Link>
            </Button>
          </Card>
        </section>
      </div>
    </div>
  )
}
