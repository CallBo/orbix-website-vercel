import { NextResponse } from 'next/server'

import { paymentsApi } from '@/lib/api'

export async function POST(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { data } = await paymentsApi.fedaPayCheckout((await params).id)
    return NextResponse.json({ success: true, data })
  } catch (error) {
    const message = error instanceof Error ? error.message : "Le paiement n'a pas pu être initié."
    return NextResponse.json({ message }, { status: 502 })
  }
}
