import { NextResponse } from 'next/server'
import { z } from 'zod'

import { projectsApi } from '@/lib/api'

const createSchema = z.object({
  clientId: z.string().uuid(),
  title: z.string().min(2),
  description: z.string().optional(),
  amount: z.number().int().positive().optional(),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
})

export async function POST(request: Request) {
  const body = await request.json().catch(() => null)
  const parsed = createSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ message: 'Formulaire invalide.' }, { status: 400 })
  }

  try {
    const { data } = await projectsApi.create(parsed.data)
    return NextResponse.json({ success: true, data }, { status: 201 })
  } catch (error) {
    const message = error instanceof Error ? error.message : "Le projet n'a pas pu être créé."
    return NextResponse.json({ message }, { status: 502 })
  }
}
