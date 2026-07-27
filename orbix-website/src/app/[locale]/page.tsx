import { getTranslations } from 'next-intl/server'
import { HeroSection } from '@/components/marketing/HeroSection'
import { StatsSection } from '@/components/marketing/StatsSection'
import { ServicesSection } from '@/components/marketing/ServicesSection'
import { HowItWorksSection } from '@/components/marketing/HowItWorksSection'
import { CTASection } from '@/components/marketing/CTASection'

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  return (
    <>
      <HeroSection locale={locale} />
      <StatsSection locale={locale} />
      <ServicesSection locale={locale} />
      <HowItWorksSection locale={locale} />
      <CTASection locale={locale} />
    </>
  )
}
