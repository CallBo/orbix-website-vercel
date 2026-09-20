import type { Metadata } from 'next'
import Link from 'next/link'
import { Plus, Download } from 'lucide-react'

import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { formatDate } from '@/lib/utils'
import { invoicesApi, type ApiInvoice } from '@/lib/api'

export const metadata: Metadata = { title: 'Admin — Factures' }

const statusLabels: Record<ApiInvoice['status'], string> = {
  EN_ATTENTE: 'En attente',
  PAYEE: 'Payée',
  EN_RETARD: 'En retard',
  ANNULEE: 'Annulée',
}

const statusVariants: Record<ApiInvoice['status'], 'default' | 'success' | 'warning' | 'error'> = {
  EN_ATTENTE: 'warning',
  PAYEE: 'success',
  EN_RETARD: 'error',
  ANNULEE: 'default',
}

async function safeLoad() {
  try {
    const res = await invoicesApi.listAll()
    return { invoices: res.data, error: false }
  } catch {
    return { invoices: [], error: true }
  }
}

export default async function AdminInvoicesPage() {
  const { invoices, error } = await safeLoad()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold text-white">Factures</h1>
          <p className="mt-1 text-text-secondary">
            Paiement en ligne (Stripe / Mobile Money) confirmé automatiquement par webhook.
          </p>
        </div>
        <Button variant="gradient" asChild>
          <Link href="/admin/invoices/new">
            <Plus className="h-4 w-4" /> Nouvelle facture
          </Link>
        </Button>
      </div>

      {error ? (
        <Card className="border-warning/30 bg-warning/10 text-sm text-warning">
          orbix-api n&apos;est pas joignable pour l&apos;instant.
        </Card>
      ) : invoices.length === 0 ? (
        <Card className="text-sm text-text-secondary">Aucune facture pour l&apos;instant.</Card>
      ) : (
        <Card className="overflow-x-auto p-0">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-surface-border text-xs uppercase tracking-wide text-text-muted">
                <th className="px-6 py-4 font-medium">Numéro</th>
                <th className="px-6 py-4 font-medium">Client</th>
                <th className="px-6 py-4 font-medium">Montant</th>
                <th className="px-6 py-4 font-medium">Échéance</th>
                <th className="px-6 py-4 font-medium">Statut</th>
                <th className="px-6 py-4 font-medium">PDF</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-border">
              {invoices.map((invoice) => (
                <tr key={invoice.id} className="hover:bg-surface-overlay">
                  <td className="px-6 py-4 font-mono text-xs text-white">{invoice.number}</td>
                  <td className="px-6 py-4 text-text-secondary">{invoice.client?.name ?? '—'}</td>
                  <td className="px-6 py-4 text-text-secondary">{invoice.amount.toLocaleString('fr-FR')} FCFA</td>
                  <td className="px-6 py-4 text-text-secondary">{formatDate(invoice.dueDate)}</td>
                  <td className="px-6 py-4">
                    <Badge variant={statusVariants[invoice.status]} size="sm">
                      {statusLabels[invoice.status]}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    <a
                      href={`/api/invoices/${invoice.id}/pdf`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-orbix-400 hover:text-orbix-300"
                    >
                      <Download className="h-3.5 w-3.5" />
                    </a>
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
