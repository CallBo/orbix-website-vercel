import { NextResponse } from 'next/server'
import { z } from 'zod'

import { projectsApi } from '@/lib/api'

const updateSchema = z.object({
  title: z.string().min(2).optional(),
  description: z.string().optional(),
  status: z
    .enum(['NOUVEAU', 'EN_ATTENTE_DE_BRIEF', 'BRIEF_RECU', 'EN_COURS', 'REVISION', 'LIVRAISON', 'TERMINE', 'ARCHIVE'])
    .optional(),
  progress: z.number().int().min(0).max(100).optional(),
  amount: z.number().int().positive().optional(),
  endDate: z.string().optional(),
})

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const body = await request.json().catch(() => null)
  const parsed = updateSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ message: 'Formulaire invalide.' }, { status: 400 })
  }

  try {
    const { data } = await projectsApi.update((await params).id, {
      ...parsed.data,
      endDate: parsed.data.endDate ? new Date(parsed.data.endDate).toISOString() : undefined,
    })
    return NextResponse.json({ success: true, data })
  } catch (error) {
    const message = error instanceof Error ? error.message : "Le projet n'a pas pu être mis à jour."
    return NextResponse.json({ message }, { status: 502 })
  }
}
