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
import type { BlogPost, BlogPostStatus } from '@/lib/api'

const schema = z.object({
  title: z.string().min(4, 'Le titre doit faire au moins 4 caractères.'),
  content: z.string().min(20, "L'article doit faire au moins 20 caractères."),
  coverImage: z.string().url("URL d'image invalide.").optional().or(z.literal('')),
  status: z.enum(['BROUILLON', 'PUBLIE', 'ARCHIVE']),
})

type FormValues = z.infer<typeof schema>

interface BlogPostFormProps {
  mode: 'create' | 'edit'
  post?: BlogPost
}

export function BlogPostForm({ mode, post }: BlogPostFormProps) {
  const router = useRouter()
  const [submitting, setSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: post?.title ?? '',
      content: post?.content ?? '',
      coverImage: post?.coverImage ?? '',
      status: post?.status ?? ('BROUILLON' as BlogPostStatus),
    },
  })

  const onSubmit = async (values: FormValues) => {
    setSubmitting(true)
    try {
      const url = mode === 'create' ? '/api/admin/blog' : `/api/admin/blog/${post?.id}`
      const method = mode === 'create' ? 'POST' : 'PATCH'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })

      if (!res.ok) {
        const body = await res.json().catch(() => null)
        throw new Error(body?.message ?? 'Une erreur est survenue.')
      }

      toast.success(mode === 'create' ? 'Article créé.' : 'Article mis à jour.')
      router.push('/admin/blog')
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

      <Textarea
        label="Contenu"
        required
        rows={14}
        placeholder="Écris l'article ici. Sépare les paragraphes par une ligne vide."
        {...register('content')}
        error={errors.content?.message}
      />

      <Input
        label="Image de couverture (URL)"
        {...register('coverImage')}
        error={errors.coverImage?.message}
        hint="Facultatif"
      />

      <div className="space-y-1.5">
        <label className="block text-sm font-medium text-text-secondary">Statut</label>
        <select
          {...register('status')}
          className="w-full rounded-xl border border-surface-border bg-surface-raised px-4 py-3 font-body text-sm text-text-primary transition-all duration-200 hover:border-surface-muted focus:border-orbix-500 focus:outline-none focus:ring-2 focus:ring-orbix-500/50"
        >
          <option value="BROUILLON" className="bg-surface-raised">
            Brouillon
          </option>
          <option value="PUBLIE" className="bg-surface-raised">
            Publié
          </option>
          <option value="ARCHIVE" className="bg-surface-raised">
            Archivé
          </option>
        </select>
      </div>

      <div className="flex gap-3">
        <Button type="submit" variant="gradient" loading={submitting}>
          {mode === 'create' ? "Créer l'article" : 'Enregistrer'}
        </Button>
        <Button type="button" variant="secondary" onClick={() => router.push('/admin/blog')}>
          Annuler
        </Button>
      </div>
    </form>
  )
}
