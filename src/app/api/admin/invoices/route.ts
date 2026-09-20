import { NextResponse } from 'next/server'
import { z } from 'zod'

import { invoicesApi } from '@/lib/api'

const createSchema = z.object({
  clientId: z.string().uuid(),
  projectId: z.string().uuid().optional().or(z.literal('')),
  amount: z.number().int().positive(),
  dueDate: z.string().datetime(),
})

export async function POST(request: Request) {
  const body = await request.json().catch(() => null)
  const parsed = createSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ message: 'Formulaire invalide.' }, { status: 400 })
  }

  try {
    const { data } = await invoicesApi.create({
      ...parsed.data,
      projectId: parsed.data.projectId || undefined,
    })
    return NextResponse.json({ success: true, data }, { status: 201 })
  } catch (error) {
    const message = error instanceof Error ? error.message : "La facture n'a pas pu être créée."
    return NextResponse.json({ message }, { status: 502 })
  }
}
