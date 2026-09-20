import { NextResponse } from 'next/server'
import { z } from 'zod'

import { blogApi } from '@/lib/api'

const createSchema = z.object({
  title: z.string().min(4),
  content: z.string().min(20),
  coverImage: z.string().url().optional().or(z.literal('')),
})

// Relaie vers POST /v1/blog/admin côté orbix-api. Le contrôle de rôle réel
// (admin/super_admin) se fait là-bas (RolesGuard) — cette route ne fait que
// transmettre le token Clerk de la session, elle ne décide rien elle-même.
export async function POST(request: Request) {
  const body = await request.json().catch(() => null)
  const parsed = createSchema.safeParse(body)

  if (!parsed.success) {
    return NextResponse.json({ message: 'Formulaire invalide.' }, { status: 400 })
  }

  try {
    const { data } = await blogApi.create({
      title: parsed.data.title,
      content: parsed.data.content,
      coverImage: parsed.data.coverImage || undefined,
    })
    return NextResponse.json({ success: true, data }, { status: 201 })
  } catch (error) {
    const message = error instanceof Error ? error.message : "L'article n'a pas pu être créé."
    return NextResponse.json({ message }, { status: 502 })
  }
}
