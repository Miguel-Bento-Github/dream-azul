// Cache name
const CACHE_NAME = `dream-azul-v1-${new Date().toISOString()}`

// Files to cache (adjust as needed)
const URLS_TO_PRECACHE = ['/', '/index.html']

// Install event: Pre-cache resources
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Installing...')
  event.waitUntil(
    caches.open(CACHE_VERSION).then((cache) => {
      console.log('[Service Worker] Caching resources')
      return cache.addAll(URLS_TO_PRECACHE)
    }),
  )
  self.skipWaiting() // Activate the service worker immediately
})

// Activate event: Cleanup old caches
self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activating...')
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_VERSION) {
            console.log(`[Service Worker] Deleting old cache: ${cacheName}`)
            return caches.delete(cacheName)
          }
        }),
      ),
    ),
  )
  self.clients.claim() // Take control of uncontrolled clients
})

// Fetch event: Serve cached content or fetch from network
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => response || fetch(event.request)),
  )
})

// Listen for messages from the client
self.addEventListener('message', (event) => {
  if (event.data?.type === 'CHECK_UPDATE') {
    console.log('[Service Worker] Check update triggered')
    self.skipWaiting() // Skip waiting when requested
  }
})

// Notify clients about the new version
self.addEventListener('controllerchange', () => {
  console.log('[Service Worker] Controller changed, notifying clients...')
  self.clients.matchAll({ type: 'window' }).then((clients) => {
    clients.forEach((client) => client.postMessage({ type: 'NEW_VERSION_AVAILABLE' }))
  })
})
