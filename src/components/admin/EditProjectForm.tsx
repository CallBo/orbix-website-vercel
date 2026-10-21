'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { Textarea } from '@/components/ui/Textarea'
import { Button } from '@/components/ui/Button'
import type { ApiProject } from '@/lib/api'

const statusLabels: Record<string, string> = {
  NOUVEAU: 'Nouveau',
  EN_ATTENTE_DE_BRIEF: 'En attente de brief',
  BRIEF_RECU: 'Brief reçu',
  EN_COURS: 'En cours',
  REVISION: 'Révision',
  LIVRAISON: 'Livraison',
  TERMINE: 'Terminé',
  ARCHIVE: 'Archivé',
}

interface FormValues {
  status: string
  progress: number
  description: string
}

export function EditProjectForm({ project }: { project: ApiProject }) {
  const router = useRouter()
  const [submitting, setSubmitting] = useState(false)
  const { register, handleSubmit, watch } = useForm<FormValues>({
    defaultValues: {
      status: project.status,
      progress: project.progress,
      description: project.description ?? '',
    },
  })

  const progress = watch('progress')

  const onSubmit = async (values: FormValues) => {
    setSubmitting(true)
    try {
      const res = await fetch(`/api/admin/projects/${project.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: values.status,
          progress: Number(values.progress),
          description: values.description || undefined,
        }),
      })
      if (!res.ok) throw new Error((await res.json())?.message ?? 'Erreur.')
      toast.success('Projet mis à jour.')
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
        <label className="block text-sm font-medium text-text-secondary">Statut</label>
        <select
          {...register('status')}
          className="w-full rounded-xl border border-surface-border bg-surface-raised px-4 py-3 text-sm text-text-primary focus:border-orbix-500 focus:outline-none focus:ring-2 focus:ring-orbix-500/50"
        >
          {Object.entries(statusLabels).map(([value, label]) => (
            <option key={value} value={value} className="bg-surface-raised">
              {label}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-1.5">
        <label className="block text-sm font-medium text-text-secondary">
          Avancement — {progress}%
        </label>
        <input
          type="range"
          min={0}
          max={100}
          step={5}
          {...register('progress', { valueAsNumber: true })}
          className="w-full accent-orbix-500"
        />
      </div>

      <Textarea label="Description" {...register('description')} />

      <div className="flex gap-3">
        <Button type="submit" variant="gradient" loading={submitting}>
          Enregistrer
        </Button>
        <Button type="button" variant="secondary" onClick={() => router.push('/admin/projects')}>
          Annuler
        </Button>
      </div>
    </form>
  )
}
