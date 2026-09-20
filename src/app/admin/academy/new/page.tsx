import type { Metadata } from 'next'

import { NewCourseForm } from '@/components/admin/NewCourseForm'

export const metadata: Metadata = { title: 'Admin — Nouveau cours Academy' }

export default function NewAcademyCoursePage() {
  return (
    <div className="max-w-xl space-y-6">
      <h1 className="font-display text-3xl font-bold text-white">Nouveau cours</h1>
      <NewCourseForm />
    </div>
  )
}
