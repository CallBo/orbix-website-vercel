import type { Metadata } from 'next'
import Link from 'next/link'

import { Container } from '@/components/layout/Container'
import { formatDate } from '@/lib/utils'
import { blogApi, type BlogPost } from '@/lib/api'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Méthode, intelligence artificielle et infrastructure — les notes techniques d’Orbix Labs.',
}

// orbix-api n'est pas forcément joignable (pas de base Azure tant qu'elle
// n'existe pas) — on échoue proprement vers une liste vide plutôt que de
// faire planter la page.
async function safeListPosts(): Promise<BlogPost[]> {
  try {
    const res = await blogApi.listPublished()
    return res.data
  } catch {
    return []
  }
}

export default async function BlogPage() {
  const posts = await safeListPosts()

  return (
    <div className="py-32 md:py-40">
      <Container className="max-w-2xl">
        <h1 className="font-display text-4xl font-bold tracking-tight text-text-primary md:text-5xl">Blog</h1>
        <p className="mt-4 text-base leading-relaxed text-text-secondary">
          Ce qu&apos;on apprend en construisant pour des entreprises africaines — méthode,
          IA, infrastructure.
        </p>
      </Container>

      <Container className="mt-14 max-w-2xl space-y-10">
        {posts.length === 0 && (
          <p className="text-sm text-text-muted">
            Aucun article publié pour l&apos;instant — revenez bientôt.
          </p>
        )}
        {posts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
            <div className="flex items-center gap-3 text-xs text-text-muted">
              <span>{post.publishedAt ? formatDate(post.publishedAt) : formatDate(post.createdAt)}</span>
            </div>
            <h2 className="mt-3 font-display text-xl font-semibold text-text-primary transition-colors group-hover:text-orbix-300">
              {post.title}
            </h2>
            <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-text-secondary">
              {post.content}
            </p>
          </Link>
        ))}
      </Container>
    </div>
  )
}
