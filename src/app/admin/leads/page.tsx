import type { Metadata } from 'next'
import Link from 'next/link'

import { cn } from '@/lib/utils'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { leadsApi, WAITLIST_SERVICE_PREFIX, type Lead } from '@/lib/api'

export const metadata: Metadata = { title: 'Admin — Demandes' }

// Toutes les demandes reçues depuis le site : demandes de devis
// (formulaire de contact) et inscriptions à la liste d'attente de la
// nouvelle app Orbix (teaser de la page d'accueil). Les deux vivent dans
// la même table `leads` côté API.

type Filter = 'tous' | 'attente' | 'devis'

const isWaitlist = (l: Lead) => l.service.startsWith(WAITLIST_SERVICE_PREFIX)

// Lien direct vers la conversation : WhatsApp pour un numéro, e-mail sinon.
// Numéros béninois saisis sans indicatif (10 chiffres commençant par 01)
// → préfixe 229 ajouté pour wa.me.
function contactHref(contact: string) {
  if (contact.includes('@')) return `mailto:${contact}`
  let digits = contact.replace(/\D/g, '')
  if (!contact.trim().startsWith('+') && digits.length === 10 && digits.startsWith('01')) digits = `229${digits}`
  return `https://wa.me/${digits}`
}

async function safeLoad() {
  try {
    const res = await leadsApi.list()
    return { leads: res.data, error: false }
  } catch {
    return { leads: [] as Lead[], error: true }
  }
}

export default async function AdminLeadsPage({ searchParams }: { searchParams: Promise<{ f?: string }> }) {
  const { f } = await searchParams
  const filter: Filter = f === 'attente' || f === 'devis' ? f : 'tous'
  const { leads, error } = await safeLoad()

  const waitlist = leads.filter(isWaitlist)
  const quotes = leads.filter((l) => !isWaitlist(l))
  const shown = filter === 'attente' ? waitlist : filter === 'devis' ? quotes : leads

  const tabs: { key: Filter; label: string; count: number }[] = [
    { key: 'tous', label: 'Tout', count: leads.length },
    { key: 'attente', label: "Liste d'attente app", count: waitlist.length },
    { key: 'devis', label: 'Demandes de devis', count: quotes.length },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold text-text-primary">Demandes</h1>
        <p className="mt-1 text-sm text-text-secondary">
          {waitlist.filter((l) => l.service.endsWith('entreprise')).length} entreprise(s) et{' '}
          {waitlist.filter((l) => l.service.endsWith('particulier')).length} particulier(s) attendent l&apos;app Orbix.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {tabs.map((t) => (
          <Link
            key={t.key}
            href={t.key === 'tous' ? '/admin/leads' : `/admin/leads?f=${t.key}`}
            className={cn(
              'rounded-full border px-4 py-1.5 text-sm transition-colors',
              filter === t.key
                ? 'border-ink-900 bg-ink-900 text-white'
                : 'border-surface-border text-text-secondary hover:border-text-muted hover:text-text-primary'
            )}
          >
            {t.label} <span className="opacity-60">({t.count})</span>
          </Link>
        ))}
      </div>

      {error ? (
        <Card className="border-warning/30 bg-warning/10 text-sm text-warning">
          orbix-api n&apos;est pas joignable pour l&apos;instant.
        </Card>
      ) : shown.length === 0 ? (
        <Card className="text-sm text-text-secondary">Aucune demande pour l&apos;instant.</Card>
      ) : (
        <Card className="overflow-x-auto p-0">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-surface-border text-xs uppercase tracking-wide text-text-muted">
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium">Nom</th>
                <th className="px-6 py-4 font-medium">Contact</th>
                <th className="px-6 py-4 font-medium">Type</th>
                <th className="px-6 py-4 font-medium">Détails</th>
              </tr>
            </thead>
            <tbody>
              {shown.map((l) => {
                const wl = isWaitlist(l)
                return (
                  <tr key={l.id} className="border-b border-surface-border last:border-0 align-top">
                    <td className="whitespace-nowrap px-6 py-4 text-text-muted">
                      {new Date(l.createdAt).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-medium text-text-primary">{l.name}</p>
                      {l.company && <p className="text-text-muted">{l.company}</p>}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <a href={contactHref(l.email)} target="_blank" rel="noreferrer" className="text-text-primary underline-offset-2 hover:underline">
                        {l.email}
                      </a>
                    </td>
                    <td className="px-6 py-4">
                      {wl ? (
                        <Badge variant="primary">{l.service.endsWith('entreprise') ? 'Attente · entreprise' : 'Attente · particulier'}</Badge>
                      ) : (
                        <Badge>Devis · {l.service}</Badge>
                      )}
                    </td>
                    <td className="max-w-md px-6 py-4 text-text-secondary">{l.message}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </Card>
      )}
    </div>
  )
}
