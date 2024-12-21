import type { App } from 'vue'

export function cacheServiceWorker() {
  if (!('serviceWorker' in navigator)) return

  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js')
      .then((registration) => {
        console.log('[Vite] Service Worker registered with scope:', registration.scope)

        // Listen for updates
        navigator.serviceWorker.addEventListener('message', (event) => {
          if (event.data?.type === 'NEW_VERSION_AVAILABLE') {
            console.log('[Vite] New version available. Reloading...')
            window.location.reload()
          }
        })
      })
      .catch((error) => {
        console.error('[Vite] Service Worker registration failed:', error)
      })
  })
}

export const versionCachePlugin = {
  install(app: App) {
    cacheServiceWorker()
  },
}
