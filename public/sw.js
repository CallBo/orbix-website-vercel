// public/sw.js
//
// Volontairement minimal. Ce site a des pages protégées par Clerk
// (/dashboard/*) avec des données propres à chaque utilisateur — un service
// worker qui mettrait ça en cache pourrait servir la page d'un client à un
// autre sur un poste partagé, ou afficher du contenu périmé après
// déconnexion. Donc :
//   - Les navigations (HTML) passent TOUJOURS par le réseau en premier.
//     Le cache ne sert qu'en secours si le réseau est indisponible.
//   - Seuls les assets statiques de marque (icônes) sont mis en cache
//     directement, jamais les réponses de l'API ni les pages du dashboard.

const STATIC_CACHE = 'orbix-static-v1'
const OFFLINE_URL = '/offline.html'

const PRECACHE_ASSETS = ['/offline.html', '/icon-192.png', '/icon-512.png']

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => cache.addAll(PRECACHE_ASSETS)).then(() => self.skipWaiting())
  )
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== STATIC_CACHE).map((key) => caches.delete(key))))
      .then(() => self.clients.claim())
  )
})

self.addEventListener('fetch', (event) => {
  const { request } = event

  // Uniquement GET, et on ignore complètement tout ce qui touche à l'API
  // ou aux routes protégées : pas de cache-first ni de fallback dessus.
  if (request.method !== 'GET') return
  if (request.url.includes('/api/')) return

  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request).catch(() => caches.match(OFFLINE_URL).then((res) => res ?? Response.error()))
    )
    return
  }

  if (PRECACHE_ASSETS.some((asset) => request.url.endsWith(asset))) {
    event.respondWith(caches.match(request).then((cached) => cached ?? fetch(request)))
  }
})
