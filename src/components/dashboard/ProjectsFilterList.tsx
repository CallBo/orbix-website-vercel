'use client'

import { useState } from 'react'

import { ProjectProgressCard } from '@/components/dashboard/ProjectProgressCard'
import { cn } from '@/lib/utils'
import type { Project, ProjectStatus } from '@/types'

const filters: { label: string; statuses: ProjectStatus[] | null }[] = [
  { label: 'Tous', statuses: null },
  { label: 'En cours', statuses: ['EN_COURS', 'REVISION', 'LIVRAISON'] },
  { label: 'En attente', statuses: ['NOUVEAU', 'EN_ATTENTE_DE_BRIEF', 'BRIEF_RECU'] },
  { label: 'Terminés', statuses: ['TERMINE', 'ARCHIVE'] },
]

interface ProjectsFilterListProps {
  projects: Project[]
  href?: string
  // Quand true, chaque carte lie vers sa propre page de détail
  // (/admin/projects/{id}) plutôt que vers `href` fixe pour toutes —
  // utilisé côté admin où éditer un projet précis a un sens ; côté
  // client (lecture seule), `href` reste la même page pour toutes les
  // cartes.
  linkToDetail?: boolean
}

export function ProjectsFilterList({ projects, href, linkToDetail }: ProjectsFilterListProps) {
  const [activeFilter, setActiveFilter] = useState(0)

  const filtered = projects.filter((project) => {
    const statuses = filters[activeFilter]?.statuses
    return !statuses || statuses.includes(project.status)
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {filters.map((filter, index) => (
          <button
            key={filter.label}
            onClick={() => setActiveFilter(index)}
            className={cn(
              'rounded-full px-4 py-1.5 text-sm font-medium transition-colors',
              activeFilter === index
                ? 'bg-orbix-500 text-white'
                : 'bg-surface-raised text-text-secondary hover:text-white'
            )}
          >
            {filter.label}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.length > 0 ? (
          filtered.map((project) => (
            <ProjectProgressCard
              key={project.id}
              project={project}
              href={linkToDetail ? `/admin/projects/${project.id}` : href}
            />
          ))
        ) : (
          <p className="py-12 text-center text-sm text-text-muted">Aucun projet dans cette catégorie.</p>
        )}
      </div>
    </div>
  )
}
