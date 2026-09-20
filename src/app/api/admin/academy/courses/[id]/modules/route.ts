import { NextResponse } from 'next/server'
import { z } from 'zod'

import { academyAdminApi } from '@/lib/api'

const schema = z.object({ title: z.string().min(2), order: z.number().int().min(0) })

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const body = await request.json().catch(() => null)
  const parsed = schema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ message: 'Formulaire invalide.' }, { status: 400 })
  }

  try {
    const { data } = await academyAdminApi.createModule((await params).id, parsed.data)
    return NextResponse.json({ success: true, data }, { status: 201 })
  } catch (error) {
    const message = error instanceof Error ? error.message : "Le module n'a pas pu être créé."
    return NextResponse.json({ message }, { status: 502 })
  }
}
