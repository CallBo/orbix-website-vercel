import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { BlogPostForm } from '@/components/admin/BlogPostForm'
import { blogApi } from '@/lib/api'

export const metadata: Metadata = { title: 'Admin — Modifier l’article' }

interface EditBlogPostPageProps {
  params: Promise<{ id: string }>
}

export default async function EditBlogPostPage({ params }: EditBlogPostPageProps) {
  const { id } = await params

  // Pas de GET /v1/blog/admin/:id dédié côté orbix-api pour l'instant —
  // on filtre la liste admin/all. Correct tant que le nombre d'articles
  // reste modeste ; à revisiter (endpoint dédié) si le blog grossit
  // beaucoup, pour éviter de retélécharger toute la liste à chaque édition.
  let post
  try {
    const { data } = await blogApi.listAllForAdmin()
    post = data.find((p) => p.id === id)
  } catch {
    post = undefined
  }

  if (!post) notFound()

  return (
    <div className="max-w-2xl space-y-6">
      <h1 className="font-display text-3xl font-bold text-white">Modifier l&apos;article</h1>
      <BlogPostForm mode="edit" post={post} />
    </div>
  )
}
