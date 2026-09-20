import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { CourseDetailManager } from '@/components/admin/CourseDetailManager'
import { academyAdminApi } from '@/lib/api'

export const metadata: Metadata = { title: 'Admin — Cours Academy' }

interface CourseDetailPageProps {
  params: Promise<{ id: string }>
}

export default async function CourseDetailPage({ params }: CourseDetailPageProps) {
  const { id } = await params

  // Pas de GET /v1/academy/courses/admin/:id dédié — on filtre la liste
  // admin/all, même pattern que /admin/blog/[id]/edit. À revisiter si le
  // catalogue grossit beaucoup.
  let course
  try {
    const { data } = await academyAdminApi.listAll()
    course = data.find((c) => c.id === id)
  } catch {
    course = undefined
  }

  if (!course) notFound()

  return <CourseDetailManager course={course} />
}
