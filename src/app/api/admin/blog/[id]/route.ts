import { NextResponse } from 'next/server'
import { z } from 'zod'

import { blogApi } from '@/lib/api'

const updateSchema = z.object({
  title: z.string().min(4).optional(),
  content: z.string().min(20).optional(),
  coverImage: z.string().url().optional().or(z.literal('')),
  status: z.enum(['BROUILLON', 'PUBLIE', 'ARCHIVE']).optional(),
})

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const body = await request.json().catch(() => null)
  const parsed = updateSchema.safeParse(body)

  if (!parsed.success) {
    return NextResponse.json({ message: 'Formulaire invalide.' }, { status: 400 })
  }

  try {
    const { data } = await blogApi.update((await params).id, {
      ...parsed.data,
      coverImage: parsed.data.coverImage || undefined,
    })
    return NextResponse.json({ success: true, data })
  } catch (error) {
    const message = error instanceof Error ? error.message : "L'article n'a pas pu être mis à jour."
    return NextResponse.json({ message }, { status: 502 })
  }
}
