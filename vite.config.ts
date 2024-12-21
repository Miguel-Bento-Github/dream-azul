import { fileURLToPath, URL } from 'node:url'
import { VitePWA } from 'vite-plugin-pwa'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['logo.svg'],
      devOptions: {
        enabled: true,
      },
      manifest: {
        name: 'Dream Azul',
        short_name: 'DreamAzul',
        description: "Our life's dream",
        theme_color: '##18417E',
        icons: [
          {
            src: 'logo.svg',
            sizes: '500x500',
            type: 'svg',
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
