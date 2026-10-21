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

const schema = z.object({
  title: z.string().min(2, 'Titre trop court.'),
  slug: z
    .string()
    .min(2)
    .regex(/^[a-z0-9-]+$/, 'Lettres minuscules, chiffres et tirets uniquement.'),
  description: z.string().min(10, 'Décris le cours en quelques phrases.'),
  category: z.enum(['IA', 'PROGRAMMATION', 'CLOUD', 'SECURITE', 'AUTOMATISATION']),
  level: z.enum(['DEBUTANT', 'INTERMEDIAIRE', 'AVANCE']),
  isFree: z.enum(['true', 'false']),
  price: z.coerce.number().int().min(0).optional().or(z.literal('')),
  thumbnailUrl: z.string().url().optional().or(z.literal('')),
})

type FormValues = z.infer<typeof schema>

export function NewCourseForm() {
  const router = useRouter()
  const [submitting, setSubmitting] = useState(false)
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>({ defaultValues: { isFree: 'false' }, resolver: zodResolver(schema) })

  const isFree = watch('isFree')

  const onSubmit = async (values: FormValues) => {
    setSubmitting(true)
    try {
      const res = await fetch('/api/admin/academy/courses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...values,
          isFree: values.isFree === 'true',
          price: values.isFree === 'true' ? 0 : Number(values.price || 0),
        }),
      })
      const body = await res.json()
      if (!res.ok) throw new Error(body?.message ?? 'Erreur.')

      toast.success('Cours créé.')
      router.push(`/admin/academy/${body.data.id}`)
      router.refresh()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Une erreur est survenue.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <Input label="Titre" required {...register('title')} error={errors.title?.message} />
      <Input
        label="Slug (URL)"
        required
        placeholder="ai-for-everyone"
        {...register('slug')}
        error={errors.slug?.message}
        hint="Utilisé dans l'URL du cours, ex. /courses/ai-for-everyone"
      />
      <Textarea label="Description" required {...register('description')} error={errors.description?.message} />

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-text-secondary">Catégorie</label>
          <select
            {...register('category')}
            className="w-full rounded-xl border border-surface-border bg-surface-raised px-4 py-3 text-sm text-text-primary focus:border-orbix-500 focus:outline-none focus:ring-2 focus:ring-orbix-500/50"
          >
            <option value="IA" className="bg-surface-raised">IA</option>
            <option value="PROGRAMMATION" className="bg-surface-raised">Programmation</option>
            <option value="CLOUD" className="bg-surface-raised">Cloud</option>
            <option value="SECURITE" className="bg-surface-raised">Sécurité</option>
            <option value="AUTOMATISATION" className="bg-surface-raised">Automatisation</option>
          </select>
        </div>

        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-text-secondary">Niveau</label>
          <select
            {...register('level')}
            className="w-full rounded-xl border border-surface-border bg-surface-raised px-4 py-3 text-sm text-text-primary focus:border-orbix-500 focus:outline-none focus:ring-2 focus:ring-orbix-500/50"
          >
            <option value="DEBUTANT" className="bg-surface-raised">Débutant</option>
            <option value="INTERMEDIAIRE" className="bg-surface-raised">Intermédiaire</option>
            <option value="AVANCE" className="bg-surface-raised">Avancé</option>
          </select>
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="block text-sm font-medium text-text-secondary">Tarif</label>
        <select
          {...register('isFree')}
          className="w-full rounded-xl border border-surface-border bg-surface-raised px-4 py-3 text-sm text-text-primary focus:border-orbix-500 focus:outline-none focus:ring-2 focus:ring-orbix-500/50"
        >
          <option value="true" className="bg-surface-raised">Gratuit</option>
          <option value="false" className="bg-surface-raised">Payant</option>
        </select>
      </div>

      {isFree === 'false' && (
        <Input label="Prix (FCFA)" type="number" {...register('price')} error={errors.price?.message} />
      )}

      <Input label="Image de couverture (URL)" {...register('thumbnailUrl')} hint="Facultatif" />
      <p className="text-xs text-text-muted">
        La vidéo d&apos;introduction du formateur s&apos;uploade directement depuis la page du
        cours, une fois celui-ci créé.
      </p>

      <div className="flex gap-3">
        <Button type="submit" variant="gradient" loading={submitting}>
          Créer le cours
        </Button>
        <Button type="button" variant="secondary" onClick={() => router.push('/admin/academy')}>
          Annuler
        </Button>
      </div>
    </form>
  )
}
