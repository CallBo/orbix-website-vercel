'use client'

import { useEffect } from 'react'

// Enregistré uniquement en prod : en dev, un service worker qui traîne
// complique le rechargement à chaud et peut servir du code périmé.
export function ServiceWorkerRegistration() {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') return
    if (!('serviceWorker' in navigator)) return

    navigator.serviceWorker.register('/sw.js').catch(() => {
      // Échec silencieux : la PWA n'est qu'une amélioration progressive,
      // le site doit rester pleinement utilisable sans service worker.
    })
  }, [])

  return null
}
