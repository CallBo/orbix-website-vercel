import type { Metadata } from 'next'
import { currentUser } from '@clerk/nextjs/server'

import { Card } from '@/components/ui/Card'
import { ProjectMessagesLayout } from '@/components/dashboard/ProjectMessagesLayout'
import { projectsApi } from '@/lib/api'

export const metadata: Metadata = { title: 'Messages' }

async function safeLoadProjects() {
  try {
    const res = await projectsApi.listMine()
    return { projects: res.data, error: false }
  } catch {
    return { projects: [], error: true }
  }
}

export default async function MessagesPage() {
  const user = await currentUser()
  const { projects, error } = await safeLoadProjects()
  const currentUserName = [user?.firstName, user?.lastName].filter(Boolean).join(' ') || 'Moi'

  return (
    <div className="space-y-6">
      <h1 className="font-display text-3xl font-bold text-white">Messages</h1>

      {error ? (
        <Card className="border-warning/30 bg-warning/10 text-sm text-warning">
          orbix-api n&apos;est pas joignable pour l&apos;instant.
        </Card>
      ) : (
        <ProjectMessagesLayout
          projects={projects.map((p) => ({ id: p.id, title: p.title }))}
          currentUserName={currentUserName}
        />
      )}
    </div>
  )
}
