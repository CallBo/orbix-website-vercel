'use client'

import { useState } from 'react'

import { cn } from '@/lib/utils'
import { MessageThread } from './MessageThread'

interface ProjectOption {
  id: string
  title: string
}

interface ProjectMessagesLayoutProps {
  projects: ProjectOption[]
  currentUserName: string
}

export function ProjectMessagesLayout({ projects, currentUserName }: ProjectMessagesLayoutProps) {
  const [selectedId, setSelectedId] = useState(projects[0]?.id)

  if (projects.length === 0) {
    return <p className="text-sm text-text-muted">Aucun projet à discuter pour l&apos;instant.</p>
  }

  return (
    <div className="grid gap-4 lg:grid-cols-[280px_1fr]">
      <div className="space-y-1 rounded-2xl border border-surface-border bg-surface-raised p-2">
        {projects.map((project) => (
          <button
            key={project.id}
            onClick={() => setSelectedId(project.id)}
            className={cn(
              'w-full truncate rounded-xl px-3 py-2.5 text-left text-sm font-medium transition-colors',
              selectedId === project.id
                ? 'bg-orbix-500/15 text-orbix-300'
                : 'text-text-secondary hover:bg-surface-overlay hover:text-white'
            )}
          >
            {project.title}
          </button>
        ))}
      </div>

      {selectedId && <MessageThread projectId={selectedId} currentUserName={currentUserName} />}
    </div>
  )
}
