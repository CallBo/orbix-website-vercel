import type { Metadata } from 'next'

import { ProjectsFilterList } from '@/components/dashboard/ProjectsFilterList'
import { Card } from '@/components/ui/Card'
import { projectsApi, toClientProject } from '@/lib/api'

export const metadata: Metadata = { title: 'Mes projets' }

async function safeLoad() {
  try {
    const res = await projectsApi.listMine()
    return { projects: res.data.map(toClientProject), error: false }
  } catch {
    return { projects: [], error: true }
  }
}

export default async function ProjectsPage() {
  const { projects, error } = await safeLoad()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold text-text-primary">Mes projets</h1>
      </div>

      {error ? (
        <Card className="border-warning/30 bg-warning/10 text-sm text-warning">
          orbix-api n&apos;est pas joignable pour l&apos;instant.
        </Card>
      ) : (
        <ProjectsFilterList projects={projects} />
      )}
    </div>
  )
}
