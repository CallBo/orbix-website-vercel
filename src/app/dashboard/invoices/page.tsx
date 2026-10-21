import type { Metadata } from 'next'
import { Download } from 'lucide-react'

import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { InvoicePaymentButtons } from '@/components/dashboard/InvoicePaymentButtons'
import { formatDate } from '@/lib/utils'
import { invoicesApi, type ApiInvoice } from '@/lib/api'

export const metadata: Metadata = { title: 'Mes factures' }

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
    const res = await invoicesApi.listMine()
    return { invoices: res.data, error: false }
  } catch {
    return { invoices: [], error: true }
  }
}

export default async function InvoicesPage() {
  const { invoices, error } = await safeLoad()

  return (
    <div className="space-y-6">
      <h1 className="font-display text-3xl font-bold text-text-primary">Mes factures</h1>

      {error && (
        <Card className="border-warning/30 bg-warning/10 text-sm text-warning">
          orbix-api n&apos;est pas joignable pour l&apos;instant.
        </Card>
      )}

      {!error && invoices.length === 0 && (
        <Card className="text-sm text-text-secondary">Aucune facture pour l&apos;instant.</Card>
      )}

      <div className="space-y-3">
        {invoices.map((invoice) => (
          <Card key={invoice.id} className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-text-muted">{invoice.number}</span>
                <Badge variant={statusVariants[invoice.status]} size="sm">
                  {statusLabels[invoice.status]}
                </Badge>
              </div>
              <p className="mt-1 font-display text-lg font-semibold text-text-primary">
                {invoice.amount.toLocaleString('fr-FR')} FCFA
              </p>
              <p className="text-xs text-text-muted">Échéance : {formatDate(invoice.dueDate)}</p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <a
                href={`/api/invoices/${invoice.id}/pdf`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-8 items-center gap-2 rounded-md border border-surface-border bg-transparent px-3 text-sm font-medium text-text-secondary transition-colors hover:border-orbix-500/50 hover:text-text-primary"
              >
                <Download className="h-4 w-4" /> PDF
              </a>
              {invoice.status !== 'PAYEE' && <InvoicePaymentButtons invoiceId={invoice.id} />}
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
