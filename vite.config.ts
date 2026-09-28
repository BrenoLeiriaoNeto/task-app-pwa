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
          src: '/Logo-dark-512px.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any maskable'
        },
        {
          src: '/Logo-light-512px.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any maskable'
        },{
          src: '/Logo-dark-256px.png',
          sizes: '256x256',
          type: 'image/png',
          purpose: 'any maskable'
        },
        {
          src: '/Logo-light-256px.png',
          sizes: '256x256',
          type: 'image/png',
          purpose: 'any maskable'
        },
        {
          src: '/Logo-dark-192px.png',
          sizes: '192x192',
          type: 'image/png',
          purpose: 'any maskable'
        },
        {
          src: '/Logo-light-192px.png',
          sizes: '192x192',
          type: 'image/png',
          purpose: 'any maskable'
        },
        {
          src: '/Logo-dark-180px.png',
          sizes: '180x180',
          type: 'image/png',
          purpose: 'any maskable'
        },
        {
          src: '/Logo-light-180px.png',
          sizes: '180x180',
          type: 'image/png',
          purpose: 'any maskable'
        },
        {
          src: '/Logo-dark-167px.png',
          sizes: '167x167',
          type: 'image/png',
          purpose: 'any maskable'
        },
        {
          src: '/Logo-light-167px.png',
          sizes: '167x167',
          type: 'image/png',
          purpose: 'any maskable'
        },
        {
          src: '/Logo-dark-144px.png',
          sizes: '144x144',
          type: 'image/png',
          purpose: 'any maskable'
        },
        {
          src: '/Logo-light-144px.png',
          sizes: '144x144',
          type: 'image/png',
          purpose: 'any maskable'
        },
        {
          src: '/Logo-dark-128px.png',
          sizes: '128x128',
          type: 'image/png',
          purpose: 'any maskable'
        },
        {
          src: '/Logo-light-128px.png',
          sizes: '128x128',
          type: 'image/png',
          purpose: 'any maskable'
        },
      ]
    }
  })],
})
