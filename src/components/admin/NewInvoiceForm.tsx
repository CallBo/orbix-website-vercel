'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'

import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import type { ApiClient, ApiProject } from '@/lib/api'

const schema = z.object({
  clientId: z.string().uuid('Sélectionne un client.'),
  projectId: z.string().optional(),
  amount: z.coerce.number().int().positive('Montant invalide.'),
  dueDate: z.string().min(1, 'Choisis une échéance.'),
})

type FormValues = z.infer<typeof schema>

export function NewInvoiceForm({ clients, projects }: { clients: ApiClient[]; projects: ApiProject[] }) {
  const router = useRouter()
  const [submitting, setSubmitting] = useState(false)
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) })

  const selectedClientId = watch('clientId')
  const clientProjects = projects.filter((p) => p.client?.id === selectedClientId)

  const onSubmit = async (values: FormValues) => {
    setSubmitting(true)
    try {
      const res = await fetch('/api/admin/invoices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientId: values.clientId,
          projectId: values.projectId || undefined,
          amount: Number(values.amount),
          dueDate: new Date(values.dueDate).toISOString(),
        }),
      })
      const body = await res.json()
      if (!res.ok) throw new Error(body?.message ?? 'Erreur.')

      toast.success('Facture créée.')
      router.push('/admin/invoices')
      router.refresh()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Une erreur est survenue.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="space-y-1.5">
        <label className="block text-sm font-medium text-text-secondary">
          Client<span className="ml-1 text-error">*</span>
        </label>
        <select
          {...register('clientId')}
          defaultValue=""
          className="w-full rounded-xl border border-surface-border bg-surface-raised px-4 py-3 text-sm text-white focus:border-orbix-500 focus:outline-none focus:ring-2 focus:ring-orbix-500/50"
        >
          <option value="" disabled className="bg-surface-raised">
            Sélectionner un client
          </option>
          {clients.map((client) => (
            <option key={client.id} value={client.id} className="bg-surface-raised">
              {client.name} — {client.company ?? client.email}
            </option>
          ))}
        </select>
        {errors.clientId && <p className="text-xs text-error">{errors.clientId.message}</p>}
      </div>

      {selectedClientId && clientProjects.length > 0 && (
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-text-secondary">Projet lié</label>
          <select
            {...register('projectId')}
            defaultValue=""
            className="w-full rounded-xl border border-surface-border bg-surface-raised px-4 py-3 text-sm text-white focus:border-orbix-500 focus:outline-none focus:ring-2 focus:ring-orbix-500/50"
          >
            <option value="" className="bg-surface-raised">
              Aucun
            </option>
            {clientProjects.map((project) => (
              <option key={project.id} value={project.id} className="bg-surface-raised">
                {project.title}
              </option>
            ))}
          </select>
        </div>
      )}

      <Input label="Montant (FCFA)" type="number" required {...register('amount')} error={errors.amount?.message} />
      <Input label="Échéance" type="date" required {...register('dueDate')} error={errors.dueDate?.message} />

      <div className="flex gap-3">
        <Button type="submit" variant="gradient" loading={submitting}>
          Créer la facture
        </Button>
        <Button type="button" variant="secondary" onClick={() => router.push('/admin/invoices')}>
          Annuler
        </Button>
      </div>
    </form>
  )
}
