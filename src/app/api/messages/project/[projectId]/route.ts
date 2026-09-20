import { NextResponse } from 'next/server'
import { z } from 'zod'

import { messagesApi } from '@/lib/api'

export async function GET(_request: Request, { params }: { params: Promise<{ projectId: string }> }) {
  try {
    const { data } = await messagesApi.listForProject((await params).projectId)
    return NextResponse.json({ success: true, data })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Impossible de charger les messages.'
    return NextResponse.json({ message }, { status: 502 })
  }
}

const sendSchema = z.object({ content: z.string().min(1).max(5000) })

export async function POST(request: Request, { params }: { params: Promise<{ projectId: string }> }) {
  const body = await request.json().catch(() => null)
  const parsed = sendSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ message: 'Message vide ou invalide.' }, { status: 400 })
  }

  try {
    const { data } = await messagesApi.send((await params).projectId, parsed.data.content)
    return NextResponse.json({ success: true, data }, { status: 201 })
  } catch (error) {
    const message = error instanceof Error ? error.message : "Le message n'a pas pu être envoyé."
    return NextResponse.json({ message }, { status: 502 })
  }
}
