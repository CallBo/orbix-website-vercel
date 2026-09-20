import type { Metadata } from 'next'

import { BlogPostForm } from '@/components/admin/BlogPostForm'

export const metadata: Metadata = { title: 'Admin — Nouvel article' }

export default function NewBlogPostPage() {
  return (
    <div className="max-w-2xl space-y-6">
      <h1 className="font-display text-3xl font-bold text-white">Nouvel article</h1>
      <BlogPostForm mode="create" />
    </div>
  )
}
