import { NextResponse } from 'next/server'
import { z } from 'zod'

import { API_URL } from '@/lib/constants'

// Relais public vers orbix-api (POST /v1/leads/waitlist). Miroir exact du
// schéma côté API (src/modules/leads/leads.schema.ts) — à garder synchronisés.
const PHONE_RE = /^\+?[0-9 ().-]{8,20}$/

const waitlistSchema = z.object({
  name: z.string().trim().min(2).max(80),
  contact: z
    .string()
    .trim()
    .min(5)
    .max(120)
    .refine((v) => z.string().email().safeParse(v).success || PHONE_RE.test(v)),
  profile: z.enum(['particulier', 'entreprise']),
  company: z.string().trim().max(120).optional(),
  sector: z.string().trim().max(80).optional(),
  city: z.string().trim().max(80).optional(),
})

export async function POST(request: Request) {
  const body = await request.json().catch(() => null)
  const parsed = waitlistSchema.safeParse(body)

  if (!parsed.success) {
    return NextResponse.json(
      { message: 'Vérifiez votre nom et votre numéro WhatsApp ou e-mail.' },
      { status: 400 }
    )
  }

  try {
    const res = await fetch(`${API_URL}/v1/leads/waitlist`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(parsed.data),
    })

    if (!res.ok) {
      return NextResponse.json({ message: "L'inscription n'a pas pu être enregistrée." }, { status: 502 })
    }

    const json = (await res.json().catch(() => null)) as { data?: { alreadyRegistered?: boolean } } | null
    return NextResponse.json({ success: true, alreadyRegistered: Boolean(json?.data?.alreadyRegistered) })
  } catch {
    return NextResponse.json({ message: 'Service indisponible pour le moment.' }, { status: 503 })
  }
}
