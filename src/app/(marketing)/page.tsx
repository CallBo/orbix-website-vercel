import { Hero } from '@/components/marketing/Hero'
import { ValueProps } from '@/components/marketing/ValueProps'
import { ServicesGrid } from '@/components/marketing/ServicesGrid'
import { HowItWorks } from '@/components/marketing/HowItWorks'
import { FinalCta } from '@/components/marketing/FinalCta'

export default function HomePage() {
  return (
    <>
      <Hero />
      <ValueProps />
      <ServicesGrid />
      <HowItWorks />
      <FinalCta />
    </>
  )
}
