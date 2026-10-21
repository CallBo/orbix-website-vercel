import type { Metadata } from 'next'
import Link from 'next/link'
import { Plus } from 'lucide-react'

import { ProjectsFilterList } from '@/components/dashboard/ProjectsFilterList'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { projectsApi, toClientProject } from '@/lib/api'

export const metadata: Metadata = { title: 'Admin — Projets' }

async function safeLoad() {
  try {
    const res = await projectsApi.listAll()
    return { projects: res.data.map(toClientProject), error: false }
  } catch {
    return { projects: [], error: true }
  }
}

export default async function AdminProjectsPage() {
  const { projects, error } = await safeLoad()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold text-text-primary">Projets</h1>
          <p className="mt-1 text-text-secondary">Tous les projets, tous clients confondus.</p>
        </div>
        <Button variant="gradient" asChild>
          <Link href="/admin/projects/new">
            <Plus className="h-4 w-4" /> Nouveau projet
          </Link>
        </Button>
      </div>

      {error ? (
        <Card className="border-warning/30 bg-warning/10 text-sm text-warning">
          orbix-api n&apos;est pas joignable pour l&apos;instant.
        </Card>
      ) : (
        <ProjectsFilterList projects={projects} linkToDetail />
      )}
    </div>
  )
}
