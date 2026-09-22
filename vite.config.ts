import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from 'vite-plugin-pwa';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), VitePWA({
    registerType: 'autoUpdate',
    manifest: {
      name: 'Task App PWA',
      short_name: 'TaskApp',
      description: 'A simple task app with PWA capabilities',

      theme_color: '#364153',
      background_color: '#364153',

      display: 'standalone',
      orientation: 'portrait',
      scope: '/',
      start_url: '/'
    }
  })],
})
