import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'

import { API_URL } from '@/lib/constants'

// Relais multipart : le navigateur envoie le fichier ici (même origine,
// pas de CORS à gérer côté API), on le retransmet à orbix-api avec le
// token Clerk attaché côté serveur — le navigateur n'a jamais à connaître
// ce token.
//
// ⚠️ Limite connue : les Route Handlers Next.js déployés sur Vercel comme
// Serverless Functions ont une limite de taille de requête (~4.5 Mo au
// moment de l'écriture). Suffisant pour tester, mais une vraie vidéo de
// cours (souvent bien plus lourde) la dépassera en production. Solution à
// terme : upload direct navigateur → Azure (SAS token généré par l'API)
// plutôt que de faire transiter le fichier par ce relais. Pas implémenté
// pour l'instant — fonctionne en local (pas de limite Vercel), à revisiter
// avant la mise en prod si les vidéos sont volumineuses.
export async function POST(request: Request, { params }: { params: Promise<{ lessonId: string }> }) {
  const { getToken } = await auth()
  const token = await getToken()

  const formData = await request.formData()

  const upstream = await fetch(`${API_URL}/v1/academy/courses/lessons/${(await params).lessonId}/video`, {
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
