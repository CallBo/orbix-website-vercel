'use client'

import { useState } from 'react'
import { CreditCard, Smartphone, Loader2 } from 'lucide-react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/Button'

interface InvoicePaymentButtonsProps {
  invoiceId: string
}

type Provider = 'stripe' | 'fedapay' | null

export function InvoicePaymentButtons({ invoiceId }: InvoicePaymentButtonsProps) {
  const [loading, setLoading] = useState<Provider>(null)

  const startCheckout = async (provider: 'stripe' | 'fedapay') => {
    setLoading(provider)
    try {
      const res = await fetch(`/api/invoices/${invoiceId}/checkout/${provider}`, { method: 'POST' })
      const body = await res.json()

      if (!res.ok) {
        throw new Error(body?.message ?? 'Une erreur est survenue.')
      }

      // Redirection vers la page de paiement hébergée (Stripe Checkout ou
      // la page sécurisée FedaPay) — le retour se fait sur STRIPE_SUCCESS_URL
      // / FEDAPAY_CALLBACK_URL configurés côté orbix-api, pas ici.
      window.location.href = body.data.checkoutUrl
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Une erreur est survenue.')
      setLoading(null)
    }
  }

  return (
    <div className="flex flex-wrap gap-2">
      <Button variant="gradient" size="sm" onClick={() => startCheckout('stripe')} loading={loading === 'stripe'}>
        {loading !== 'stripe' && <CreditCard className="h-4 w-4" />}
        Payer par carte
      </Button>
      <Button
        variant="secondary"
        size="sm"
        onClick={() => startCheckout('fedapay')}
        loading={loading === 'fedapay'}
      >
        {loading !== 'fedapay' && <Smartphone className="h-4 w-4" />}
        Mobile Money
      </Button>
    </div>
  )
}
