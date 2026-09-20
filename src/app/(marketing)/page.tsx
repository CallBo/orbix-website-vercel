import { Hero } from '@/components/marketing/Hero'
import { ValueProps } from '@/components/marketing/ValueProps'
import { ServicesGrid } from '@/components/marketing/ServicesGrid'
import { HowItWorks } from '@/components/marketing/HowItWorks'
import { FoundingNote } from '@/components/marketing/FoundingNote'
import { PricingSection } from '@/components/marketing/PricingSection'
import { FinalCta } from '@/components/marketing/FinalCta'

export default function HomePage() {
  return (
    <>
      <Hero />
      <ValueProps />
      <ServicesGrid />
      <HowItWorks />
      <FoundingNote />
      <PricingSection />
      <FinalCta />
    </>
  )
}
