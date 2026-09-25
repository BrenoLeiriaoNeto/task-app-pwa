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
    registerType: 'autoUpdate',
    injectRegister: 'auto',
    manifest: {
      name: 'Task App PWA',
      short_name: 'TaskApp',
      description: 'A simple task app with PWA capabilities',

      theme_color: '#10b981',
      background_color: '#18181b',

      display: 'standalone',
      orientation: 'portrait',
      icons: [
        {
          src: '/public/Logo-dark-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any maskable'
        },
        {
          src: '/public/Logo-light-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any maskable'
        }
      ]
    }
  })],
})
