import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from 'vite-plugin-pwa';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), VitePWA({
    strategies: 'injectManifest',
    srcDir: 'src',
    filename: 'sw.ts',
    registerType: 'prompt',
    injectRegister: 'auto',
    manifest: {
      id: '/',
      name: 'Task App PWA',
      short_name: 'TaskApp',
      description: 'A simple task app with PWA capabilities',
      start_url: '/',
      scope: '/',
      theme_color: '#10b981',
      background_color: '#18181b',

      display: 'standalone',
      orientation: 'portrait',
      icons: [
        {
          src: '/Logo-dark-192px.png',
          sizes: '192x192',
          type: 'image/png',
          purpose: 'any'
        },
        {
          src: '/Logo-dark-512px.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any'
        },
        {
          src: '/Logo-dark-512px.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'maskable'
        }
      ]
    }
  })],
})
