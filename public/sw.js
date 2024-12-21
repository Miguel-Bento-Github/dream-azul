const CACHE_NAME = `my-app-cache-${self.__BUILD_TIMESTAMP__ || 'default'}`

// Files to cache
const URLS_TO_CACHE = ['/', '/index.html', '/styles.css', '/script.js']

// Install event: Pre-cache resources
self.addEventListener('install', (event) => {
  console.log(`[Service Worker] Installing, cache name: ${CACHE_NAME}`)
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[Service Worker] Caching resources')
      return cache.addAll(URLS_TO_CACHE)
    }),
  )
  self.skipWaiting() // Activate the service worker immediately
})

// Activate event: Cleanup old caches
self.addEventListener('activate', (event) => {
  console.log(`[Service Worker] Activating, keeping cache: ${CACHE_NAME}`)
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log(`[Service Worker] Deleting old cache: ${cacheName}`)
            return caches.delete(cacheName)
          }
        }),
      )
    }),
  )
  self.clients.claim() // Take control of uncontrolled clients
})

// Fetch event: Serve cached content or fetch from network
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request)
    }),
  )
})

// Notify clients about the new version
self.addEventListener('controllerchange', () => {
  self.clients.matchAll({ type: 'window' }).then((clients) => {
    clients.forEach((client) => client.postMessage({ type: 'NEW_VERSION_AVAILABLE' }))
  })
})
