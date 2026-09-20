import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'

import { API_URL } from '@/lib/constants'

// Route à part de apiCall() (lib/api.ts) : celui-ci force response.json(),
// inadapté à un flux binaire. Le navigateur ne peut pas appeler
// directement orbix-api pour ce fichier — il n'a pas le token Clerk à
// joindre lui-même — donc ce relais côté serveur fait le pont.
export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { getToken } = await auth()
  const token = await getToken()

  const upstream = await fetch(`${API_URL}/v1/invoices/${(await params).id}/pdf`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    cache: 'no-store',
  })

  if (!upstream.ok || !upstream.body) {
    return NextResponse.json({ message: 'Impossible de générer le PDF pour le moment.' }, { status: 502 })
  }

  return new NextResponse(upstream.body, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': upstream.headers.get('Content-Disposition') ?? 'inline',
    },
  })
}
