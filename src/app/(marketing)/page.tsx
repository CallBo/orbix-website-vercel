import { Hero } from '@/components/marketing/Hero'
import { AppTeaser } from '@/components/marketing/AppTeaser'
import { ProductPanels } from '@/components/marketing/ProductPanels'
import { RealisationSpotlight } from '@/components/marketing/RealisationSpotlight'
import { ShowcaseCarousel } from '@/components/marketing/ShowcaseCarousel'
import { HowItWorks } from '@/components/marketing/HowItWorks'
import { Founders } from '@/components/marketing/Founders'
import { FinalCta } from '@/components/marketing/FinalCta'

// Structure inspirée de la page d'accueil d'apple.com : un hero, l'annonce
// de la nouvelle app Orbix (comme Apple met ses lancements en tête), puis une
// succession de grands panneaux "produit" (un par service), puis un
// carrousel horizontal, puis l'appel à l'action final.
export default function HomePage() {
  return (
    <>
      <Hero />
      <AppTeaser />
      <ProductPanels />
      <RealisationSpotlight />
      <ShowcaseCarousel />
      <HowItWorks />
      <Founders variant="compact" />
      <FinalCta />
    </>
  )
}
