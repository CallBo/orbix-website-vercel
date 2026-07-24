import { getTranslations } from 'next-intl/server'

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'hero' })

  return (
    <main className="min-h-screen bg-surface-base flex flex-col items-center justify-center px-6">
      <div className="text-center max-w-4xl mx-auto">

        <div className="inline-flex items-center gap-2 rounded-full border border-orbix-500/30 bg-orbix-500/10 px-4 py-2 text-sm text-orbix-400 mb-8">
          <span className="h-2 w-2 rounded-full bg-orbix-500 animate-pulse" />
          Engineering Tomorrow.
        </div>

        <h1 className="font-display text-5xl md:text-7xl font-bold text-white tracking-tight leading-none mb-6">
          {t('title')}
        </h1>

        <p className="font-body text-lg md:text-xl text-text-secondary leading-relaxed max-w-2xl mx-auto mb-10">
          {t('subtitle')}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="#" className="inline-flex items-center justify-center rounded-xl bg-orbix-500 px-8 py-4 text-base font-semibold text-white hover:bg-orbix-600 transition-all duration-200">
            {t('cta_primary')}
          </a>
          <a href="#" className="inline-flex items-center justify-center rounded-xl border border-surface-border bg-surface-raised px-8 py-4 text-base font-semibold text-text-secondary hover:text-white transition-all duration-200">
            {t('cta_secondary')}
          </a>
        </div>

      </div>
    </main>
  )
}
