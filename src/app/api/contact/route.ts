import { NextResponse } from 'next/server'
import { z } from 'zod'

import { API_URL } from '@/lib/constants'

const quoteRequestSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  company: z.string().optional(),
  service: z.string().min(1),
  message: z.string().min(10),
})

export async function POST(request: Request) {
  const body = await request.json().catch(() => null)
  const parsed = quoteRequestSchema.safeParse(body)

  if (!parsed.success) {
    return NextResponse.json({ message: 'Formulaire invalide.' }, { status: 400 })
  }

  try {
    const res = await fetch(`${API_URL}/v1/leads/quote-request`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(parsed.data),
    })

    if (!res.ok) {
      return NextResponse.json({ message: "La demande n'a pas pu être transmise." }, { status: 502 })
    }

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ message: 'Service indisponible pour le moment.' }, { status: 503 })
  }
}
