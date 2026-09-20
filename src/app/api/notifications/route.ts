import { NextResponse } from 'next/server'

import { notificationsApi } from '@/lib/api'

export async function GET() {
  try {
    const { data } = await notificationsApi.listUnread()
    return NextResponse.json({ success: true, data })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Impossible de charger les notifications.'
    return NextResponse.json({ message }, { status: 502 })
  }
}
