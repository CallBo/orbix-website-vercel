import type { Metadata } from 'next'
import Link from 'next/link'
import { Plus } from 'lucide-react'

import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { academyAdminApi } from '@/lib/api'

export const metadata: Metadata = { title: 'Admin — Academy' }

async function safeLoad() {
  try {
    const res = await academyAdminApi.listAll()
    return { courses: res.data, error: false }
  } catch {
    return { courses: [], error: true }
  }
}

export default async function AdminAcademyPage() {
  const { courses, error } = await safeLoad()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold text-white">Academy — Cours</h1>
          <p className="mt-1 text-text-secondary">
            Gestion du contenu consommé par orbix-academy via l&apos;API.
          </p>
        </div>
        <Button variant="gradient" asChild>
          <Link href="/admin/academy/new">
            <Plus className="h-4 w-4" /> Nouveau cours
          </Link>
        </Button>
      </div>

      {error ? (
        <Card className="border-warning/30 bg-warning/10 text-sm text-warning">
          orbix-api n&apos;est pas joignable pour l&apos;instant.
        </Card>
      ) : courses.length === 0 ? (
        <Card className="text-sm text-text-secondary">
          Aucun cours pour l&apos;instant. <Link href="/admin/academy/new" className="text-orbix-400 hover:text-orbix-300">Créer le premier</Link>.
        </Card>
      ) : (
        <div className="space-y-3">
          {courses.map((course) => (
            <Link key={course.id} href={`/admin/academy/${course.id}`} className="block">
              <Card hover>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <Badge variant={course.published ? 'success' : 'default'} size="sm">
                        {course.published ? 'Publié' : 'Brouillon'}
                      </Badge>
                      <Badge size="sm">{course.category}</Badge>
                      <Badge size="sm">{course.level}</Badge>
                    </div>
                    <h3 className="mt-2 font-display text-base font-semibold text-white">{course.title}</h3>
                    <p className="mt-1 text-xs text-text-muted">
                      {course.modules.length} module{course.modules.length > 1 ? 's' : ''} ·{' '}
                      {course.modules.reduce((sum, m) => sum + m.lessons.length, 0)} leçon(s)
                    </p>
                  </div>
                  <p className="text-sm text-text-secondary">{course.isFree ? 'Gratuit' : `${course.price.toLocaleString('fr-FR')} FCFA`}</p>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
