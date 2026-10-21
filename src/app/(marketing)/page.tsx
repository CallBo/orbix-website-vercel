import { Hero } from '@/components/marketing/Hero'
import { ProductPanels } from '@/components/marketing/ProductPanels'
import { ShowcaseCarousel } from '@/components/marketing/ShowcaseCarousel'
import { HowItWorks } from '@/components/marketing/HowItWorks'
import { FinalCta } from '@/components/marketing/FinalCta'

// Structure inspirée de la page d'accueil d'apple.com : un hero, puis une
// succession de grands panneaux "produit" (un par service), puis un
// carrousel horizontal, puis l'appel à l'action final.
export default function HomePage() {
  return (
    <>
      <Hero />
      <ProductPanels />
      <ShowcaseCarousel />
      <HowItWorks />
      <FinalCta />
    </>
  )
}
