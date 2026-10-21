import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'

import { Container } from '@/components/layout/Container'
import { formatDate } from '@/lib/utils'
import { blogApi } from '@/lib/api'

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

async function safeGetPost(slug: string) {
  try {
    const res = await blogApi.getBySlug(slug)
    return res.data
  } catch {
    return null
  }
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await safeGetPost(slug)
  if (!post) return {}
  return { title: post.title }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = await safeGetPost(slug)
  if (!post) notFound()

  // content est stocké en texte brut côté API — les paragraphes sont
  // séparés par une ligne vide (convention de l'éditeur admin, voir
  // BlogPostForm). Pas de rendu Markdown/HTML pour rester simple tant
  // qu'aucun besoin de mise en forme riche ne s'est confirmé.
  const paragraphs = post.content.split(/\n\s*\n/).filter(Boolean)

  return (
    <div className="py-32 md:py-40">
      <Container className="max-w-2xl">
        <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-text-primary">
          <ArrowLeft className="h-4 w-4" /> Retour au blog
        </Link>

        <p className="mt-6 text-xs text-text-muted">
          {formatDate(post.publishedAt ?? post.createdAt)}
        </p>

        <h1 className="mt-4 font-display text-3xl font-bold tracking-tight text-text-primary md:text-4xl">
          {post.title}
        </h1>

        <div className="mt-8 space-y-5 text-base leading-relaxed text-text-secondary">
          {paragraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </Container>
    </div>
  )
}
