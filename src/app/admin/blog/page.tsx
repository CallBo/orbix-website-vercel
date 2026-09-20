import type { Metadata } from 'next'
import Link from 'next/link'
import { Plus, Pencil } from 'lucide-react'

import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { formatDate } from '@/lib/utils'
import { blogApi, type BlogPost, type BlogPostStatus } from '@/lib/api'

export const metadata: Metadata = { title: 'Admin — Blog' }

const statusLabels: Record<BlogPostStatus, string> = {
  BROUILLON: 'Brouillon',
  PUBLIE: 'Publié',
  ARCHIVE: 'Archivé',
}

const statusVariants: Record<BlogPostStatus, 'default' | 'success' | 'warning'> = {
  BROUILLON: 'default',
  PUBLIE: 'success',
  ARCHIVE: 'warning',
}

async function safeListPosts(): Promise<{ posts: BlogPost[]; error: boolean }> {
  try {
    const res = await blogApi.listAllForAdmin()
    return { posts: res.data, error: false }
  } catch {
    return { posts: [], error: true }
  }
}

export default async function AdminBlogPage() {
  const { posts, error } = await safeListPosts()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold text-white">Blog</h1>
          <p className="mt-1 text-text-secondary">
            {error
              ? "orbix-api n'est pas joignable pour l'instant (base de données pas encore en place)."
              : `${posts.length} article${posts.length > 1 ? 's' : ''}, tous statuts confondus.`}
          </p>
        </div>
        <Button variant="gradient" asChild>
          <Link href="/admin/blog/new">
            <Plus className="h-4 w-4" /> Nouvel article
          </Link>
        </Button>
      </div>

      {error ? (
        <Card className="text-sm text-text-secondary">
          Impossible de charger les articles. Vérifie que <code>orbix-api</code> tourne et que{' '}
          <code>NEXT_PUBLIC_API_URL</code> pointe dessus.
        </Card>
      ) : posts.length === 0 ? (
        <Card className="text-sm text-text-secondary">
          Aucun article pour l&apos;instant. <Link href="/admin/blog/new" className="text-orbix-400 hover:text-orbix-300">Créer le premier</Link>.
        </Card>
      ) : (
        <div className="space-y-3">
          {posts.map((post) => (
            <Card key={post.id} className="flex items-center justify-between">
              <div>
                <Badge variant={statusVariants[post.status]} size="sm">
                  {statusLabels[post.status]}
                </Badge>
                <h3 className="mt-2 font-display text-base font-semibold text-white">{post.title}</h3>
                <p className="mt-1 text-xs text-text-muted">
                  {post.publishedAt ? formatDate(post.publishedAt) : `Créé le ${formatDate(post.createdAt)}`}
                </p>
              </div>
              <Button variant="secondary" size="sm" asChild>
                <Link href={`/admin/blog/${post.id}/edit`}>
                  <Pencil className="h-4 w-4" /> Modifier
                </Link>
              </Button>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
