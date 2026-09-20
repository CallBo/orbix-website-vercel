import { NextResponse } from 'next/server'
import { z } from 'zod'

import { academyAdminApi } from '@/lib/api'

const schema = z.object({ published: z.boolean() })

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const body = await request.json().catch(() => null)
  const parsed = schema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ message: 'Requête invalide.' }, { status: 400 })
  }

  try {
    const { data } = await academyAdminApi.setPublished((await params).id, parsed.data.published)
    return NextResponse.json({ success: true, data })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erreur.'
    return NextResponse.json({ message }, { status: 502 })
  }
}
