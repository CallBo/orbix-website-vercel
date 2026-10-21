'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'

import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Button } from '@/components/ui/Button'
import type { ApiClient } from '@/lib/api'

const schema = z.object({
  clientId: z.string().uuid('Sélectionne un client.'),
  title: z.string().min(2, 'Le titre est trop court.'),
  description: z.string().optional(),
  amount: z.coerce.number().int().positive().optional().or(z.literal('')),
  endDate: z.string().optional(),
})

type FormValues = z.infer<typeof schema>

export function NewProjectForm({ clients }: { clients: ApiClient[] }) {
  const router = useRouter()
  const [submitting, setSubmitting] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) })

  const onSubmit = async (values: FormValues) => {
    setSubmitting(true)
    try {
      const res = await fetch('/api/admin/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientId: values.clientId,
          title: values.title,
          description: values.description || undefined,
          amount: values.amount ? Number(values.amount) : undefined,
          endDate: values.endDate ? new Date(values.endDate).toISOString() : undefined,
        }),
      })
      const body = await res.json()
      if (!res.ok) throw new Error(body?.message ?? 'Erreur.')

      toast.success('Projet créé.')
      router.push('/admin/projects')
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
          className="w-full rounded-xl border border-surface-border bg-surface-raised px-4 py-3 text-sm text-text-primary focus:border-orbix-500 focus:outline-none focus:ring-2 focus:ring-orbix-500/50"
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

      <Input label="Titre du projet" required {...register('title')} error={errors.title?.message} />
      <Textarea label="Description" {...register('description')} />
      <Input label="Montant (FCFA)" type="number" {...register('amount')} hint="Facultatif" />
      <Input label="Date de fin estimée" type="date" {...register('endDate')} hint="Facultatif" />

      <div className="flex gap-3">
        <Button type="submit" variant="gradient" loading={submitting}>
          Créer le projet
        </Button>
        <Button type="button" variant="secondary" onClick={() => router.push('/admin/projects')}>
          Annuler
        </Button>
      </div>
    </form>
  )
}
