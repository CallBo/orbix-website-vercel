import { NextResponse } from 'next/server'
import { z } from 'zod'

import { academyAdminApi } from '@/lib/api'

const schema = z.object({
  title: z.string().min(2),
  type: z.enum(['VIDEO', 'QUIZ', 'PROJET', 'TEXTE']),
  videoUrl: z.string().url().optional().or(z.literal('')),
  duration: z.number().int().positive().optional(),
  order: z.number().int().min(0),
  content: z.string().optional(),
})

export async function POST(request: Request, { params }: { params: Promise<{ moduleId: string }> }) {
  const body = await request.json().catch(() => null)
  const parsed = schema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ message: 'Formulaire invalide.' }, { status: 400 })
  }

  try {
    const { data } = await academyAdminApi.createLesson((await params).moduleId, {
      ...parsed.data,
      videoUrl: parsed.data.videoUrl || undefined,
      content: parsed.data.content || undefined,
    })
    return NextResponse.json({ success: true, data }, { status: 201 })
  } catch (error) {
    const message = error instanceof Error ? error.message : "La leçon n'a pas pu être créée."
    return NextResponse.json({ message }, { status: 502 })
  }
}
