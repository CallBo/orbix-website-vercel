import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-orbix-500 focus:px-4 focus:py-2 focus:text-white"
      >
        Aller au contenu principal
      </a>
      <Navbar />
      <main id="main-content">{children}</main>
      <Footer />
    </>
  )
}
