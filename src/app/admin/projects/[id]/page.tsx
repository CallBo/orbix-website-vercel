import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { EditProjectForm } from '@/components/admin/EditProjectForm'
import { Badge } from '@/components/ui/Badge'
import { projectsApi } from '@/lib/api'

export const metadata: Metadata = { title: 'Admin — Modifier le projet' }

interface ProjectDetailPageProps {
  params: Promise<{ id: string }>
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { id } = await params

  let project
  try {
    const { data } = await projectsApi.findOne(id)
    project = data
  } catch {
    project = undefined
  }

  if (!project) notFound()

  return (
    <div className="max-w-xl space-y-6">
      <div>
        <div className="flex items-center gap-2">
          <Badge size="sm">{project.status}</Badge>
          <Badge size="sm">{project.progress}%</Badge>
        </div>
        <h1 className="mt-2 font-display text-3xl font-bold text-text-primary">{project.title}</h1>
        {project.client && <p className="mt-1 text-sm text-text-secondary">{project.client.name}</p>}
      </div>
      <EditProjectForm project={project} />
    </div>
  )
}
