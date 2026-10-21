'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'

import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Button } from '@/components/ui/Button'

const schema = z.object({
  name: z.string().min(2, 'Indiquez votre nom.'),
  email: z.string().email('Adresse email invalide.'),
  company: z.string().optional(),
  service: z.string().min(1, 'Précisez le service qui vous intéresse.'),
  message: z.string().min(10, 'Décrivez votre besoin en quelques mots.'),
})

type FormValues = z.infer<typeof schema>

const services = ['Software', 'Intelligence artificielle', 'Cloud', 'Cybersécurité', 'Automatisation', 'Autre']

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) })

  const onSubmit = async (values: FormValues) => {
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })

      if (!res.ok) {
        const body = await res.json().catch(() => null)
        throw new Error(body?.message ?? 'Une erreur est survenue.')
      }

      setSubmitted(true)
      reset()
      toast.success('Votre demande a bien été envoyée.')
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Une erreur est survenue.')
    }
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border border-success/20 bg-success/5 p-8 text-center">
        <p className="font-display text-lg font-semibold text-text-primary">Demande envoyée</p>
        <p className="mt-2 text-sm text-text-secondary">
          Notre équipe vous répond sous 24h ouvrées à l&apos;adresse indiquée.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Input label="Nom complet" required {...register('name')} error={errors.name?.message} />
        <Input label="Email" type="email" required {...register('email')} error={errors.email?.message} />
      </div>

      <Input label="Entreprise" {...register('company')} hint="Facultatif" />

      <div className="space-y-1.5">
        <label className="block text-sm font-medium text-text-secondary">
          Service concerné<span className="ml-1 text-error">*</span>
        </label>
        <select
          {...register('service')}
          defaultValue=""
          className="w-full rounded-xl border border-surface-border bg-surface-raised px-4 py-3 font-body text-sm text-text-primary transition-all duration-200 hover:border-surface-muted focus:border-orbix-500 focus:outline-none focus:ring-2 focus:ring-orbix-500/50"
        >
          <option value="" disabled className="bg-surface-raised">
            Sélectionnez un service
          </option>
          {services.map((service) => (
            <option key={service} value={service} className="bg-surface-raised text-text-primary">
              {service}
            </option>
          ))}
        </select>
        {errors.service && <p className="text-xs text-error">{errors.service.message}</p>}
      </div>

      <Textarea
        label="Votre projet"
        required
        placeholder="Décrivez votre besoin, votre échéance, votre budget approximatif..."
        {...register('message')}
        error={errors.message?.message}
      />

      <Button type="submit" variant="gradient" size="lg" loading={isSubmitting} className="w-full sm:w-auto">
        Envoyer la demande
      </Button>
    </form>
  )
}
