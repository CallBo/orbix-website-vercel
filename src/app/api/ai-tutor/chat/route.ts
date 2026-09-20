import { NextResponse } from 'next/server'
import { z } from 'zod'

import { aiTutorApi } from '@/lib/api'

const chatSchema = z.object({
  message: z.string().min(1).max(4000),
  conversationId: z.string().uuid().optional(),
})

export async function POST(request: Request) {
  const body = await request.json().catch(() => null)
  const parsed = chatSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ message: 'Message invalide.' }, { status: 400 })
  }

  try {
    const { data } = await aiTutorApi.chat(parsed.data.message, parsed.data.conversationId)
    return NextResponse.json({ success: true, data })
  } catch (error) {
    const message = error instanceof Error ? error.message : "Orbix AI n'a pas pu répondre."
    return NextResponse.json({ message }, { status: 502 })
  }
}
