import type { App } from 'vue'

export function cacheServiceWorker() {
  if (!('serviceWorker' in navigator)) return

  const onServiceWorkerMessage = (event: MessageEvent) => {
    if (event.data?.type === 'NEW_VERSION_AVAILABLE') {
      console.info('[Client] New version available. Refreshing...')
    }
  }

  const registerServiceWorker = async () => {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js')
      console.info('[Client] Service Worker registered:', registration)
      navigator.serviceWorker.addEventListener('message', onServiceWorkerMessage)
    } catch (error) {
      console.error('[Client] Service Worker registration failed:', error)
    }
  }

  const checkForUpdates = () => {
    if (navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage({ type: 'CHECK_UPDATE' })
    }
  }

  registerServiceWorker()
  setInterval(checkForUpdates, 60000) // Check every minute
}

export const versionCachePlugin = {
  install(app: App) {
    cacheServiceWorker()
  },
}
