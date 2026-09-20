import { NextResponse } from 'next/server'

import { notificationsApi } from '@/lib/api'

export async function PATCH(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await notificationsApi.markRead((await params).id)
    return NextResponse.json({ success: true })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erreur.'
    return NextResponse.json({ message }, { status: 502 })
  }
}
