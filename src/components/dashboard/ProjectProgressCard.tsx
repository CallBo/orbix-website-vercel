import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import type { Project, ProjectStatus } from '@/types'

const statusLabels: Record<ProjectStatus, string> = {
  NOUVEAU: 'Nouveau',
  EN_ATTENTE_DE_BRIEF: 'En attente de brief',
  BRIEF_RECU: 'Brief reçu',
  EN_COURS: 'En cours',
  REVISION: 'Révision',
  LIVRAISON: 'Livraison',
  TERMINE: 'Terminé',
  ARCHIVE: 'Archivé',
}

const statusVariants: Record<ProjectStatus, 'default' | 'primary' | 'success' | 'warning'> = {
  NOUVEAU: 'default',
  EN_ATTENTE_DE_BRIEF: 'default',
  BRIEF_RECU: 'default',
  EN_COURS: 'primary',
  REVISION: 'warning',
  LIVRAISON: 'warning',
  TERMINE: 'success',
  ARCHIVE: 'default',
}

interface ProjectProgressCardProps {
  project: Project
  href?: string
}

export function ProjectProgressCard({ project, href = '/dashboard/projects' }: ProjectProgressCardProps) {
  // Pas encore de page détail par projet (prochaine itération) — le clic
  // renvoie vers la liste plutôt que vers un lien mort. `href` permet à
  // l'admin de rester dans son propre espace plutôt que d'atterrir côté client.
  return (
    <Card hover className="block">
      <Link href={href} className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-display text-base font-semibold text-white">{project.title}</h3>
            <Badge variant={statusVariants[project.status]} size="sm">
              {statusLabels[project.status]}
            </Badge>
          </div>
          {project.description && (
            <p className="mt-1 truncate text-sm text-text-secondary">{project.description}</p>
          )}
          <div className="mt-3 flex items-center gap-3">
            <div className="h-1.5 w-40 overflow-hidden rounded-full bg-surface-muted">
              <div className="h-full rounded-full bg-orbix-500" style={{ width: `${project.progress}%` }} />
            </div>
            <span className="text-xs text-text-muted">{project.progress}%</span>
          </div>
        </div>
        <ArrowRight className="h-4 w-4 flex-shrink-0 text-text-muted" />
      </Link>
    </Card>
  )
}
