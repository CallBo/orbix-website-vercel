import { NextResponse } from 'next/server'
import { z } from 'zod'

import { academyAdminApi } from '@/lib/api'

const schema = z.object({
  title: z.string().min(2).optional(),
  videoUrl: z.string().url().optional().or(z.literal('')),
  duration: z.number().int().positive().optional(),
  content: z.string().optional(),
})

export async function PATCH(request: Request, { params }: { params: Promise<{ lessonId: string }> }) {
  const body = await request.json().catch(() => null)
  const parsed = schema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ message: 'Formulaire invalide.' }, { status: 400 })
  }

  try {
    const { data } = await academyAdminApi.updateLesson((await params).lessonId, {
      ...parsed.data,
      videoUrl: parsed.data.videoUrl || undefined,
    })
    return NextResponse.json({ success: true, data })
  } catch (error) {
    const message = error instanceof Error ? error.message : "La leçon n'a pas pu être mise à jour."
    return NextResponse.json({ message }, { status: 502 })
  }
}
