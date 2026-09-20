import { NextResponse } from 'next/server'
import { z } from 'zod'

import { academyAdminApi } from '@/lib/api'

export async function GET() {
  try {
    const { data } = await academyAdminApi.listAll()
    return NextResponse.json({ success: true, data })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Impossible de charger les cours.'
    return NextResponse.json({ message }, { status: 502 })
  }
}

const createSchema = z.object({
  slug: z.string().min(2),
  title: z.string().min(2),
  description: z.string().min(10),
  category: z.enum(['IA', 'PROGRAMMATION', 'CLOUD', 'SECURITE', 'AUTOMATISATION']),
  level: z.enum(['DEBUTANT', 'INTERMEDIAIRE', 'AVANCE']),
  isFree: z.boolean(),
  price: z.number().int().min(0),
  thumbnailUrl: z.string().url().optional().or(z.literal('')),
  introVideoUrl: z.string().url().optional().or(z.literal('')),
})

export async function POST(request: Request) {
  const body = await request.json().catch(() => null)
  const parsed = createSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ message: 'Formulaire invalide.' }, { status: 400 })
  }

  try {
    const { data } = await academyAdminApi.createCourse({
      ...parsed.data,
      thumbnailUrl: parsed.data.thumbnailUrl || undefined,
      introVideoUrl: parsed.data.introVideoUrl || undefined,
    })
    return NextResponse.json({ success: true, data }, { status: 201 })
  } catch (error) {
    const message = error instanceof Error ? error.message : "Le cours n'a pas pu être créé."
    return NextResponse.json({ message }, { status: 502 })
  }
}
