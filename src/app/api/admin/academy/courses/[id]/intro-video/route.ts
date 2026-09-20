import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'

import { API_URL } from '@/lib/constants'

// Même relais multipart que la vidéo de leçon — voir son commentaire pour
// la limite de taille connue sur Vercel.
export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { getToken } = await auth()
  const token = await getToken()

  const formData = await request.formData()

  const upstream = await fetch(`${API_URL}/v1/academy/courses/${(await params).id}/intro-video`, {
    method: 'POST',
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    body: formData,
  })

  const body = await upstream.json().catch(() => null)

  if (!upstream.ok) {
    return NextResponse.json({ message: body?.message ?? "L'upload a échoué." }, { status: upstream.status })
  }

  return NextResponse.json(body)
}
