import { NextResponse } from 'next/server'
import { z } from 'zod'

import { academyAdminApi } from '@/lib/api'

const updateSchema = z.object({
  title: z.string().min(2).optional(),
  description: z.string().min(10).optional(),
  category: z.enum(['IA', 'PROGRAMMATION', 'CLOUD', 'SECURITE', 'AUTOMATISATION']).optional(),
  level: z.enum(['DEBUTANT', 'INTERMEDIAIRE', 'AVANCE']).optional(),
  isFree: z.boolean().optional(),
  price: z.number().int().min(0).optional(),
  thumbnailUrl: z.string().url().optional().or(z.literal('')),
  introVideoUrl: z.string().url().optional().or(z.literal('')),
})

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const body = await request.json().catch(() => null)
  const parsed = updateSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ message: 'Formulaire invalide.' }, { status: 400 })
  }

  try {
    const { data } = await academyAdminApi.updateCourse((await params).id, {
      ...parsed.data,
      thumbnailUrl: parsed.data.thumbnailUrl || undefined,
      introVideoUrl: parsed.data.introVideoUrl || undefined,
    })
    return NextResponse.json({ success: true, data })
  } catch (error) {
    const message = error instanceof Error ? error.message : "Le cours n'a pas pu être mis à jour."
    return NextResponse.json({ message }, { status: 502 })
  }
}
