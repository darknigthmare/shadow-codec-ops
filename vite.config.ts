import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'prompt',
      injectRegister: false,
      includeAssets: [
        'favicon.png',
        'apple-touch-icon.png',
        'pwa-64x64.png',
        'pwa-192x192.png',
        'pwa-512x512.png',
        'pwa-maskable-512x512.png'
      ],
      manifest: {
        id: '/',
        name: 'Shadow Codec Ops',
        short_name: 'Shadow Codec',
        description: 'Tactical Codec simulator with branching Campaign Ops, Side Ops, VR missions and creation tools.',
        theme_color: '#06140c',
        background_color: '#020703',
        display: 'standalone',
        orientation: 'landscape',
        start_url: '/',
        scope: '/',
        lang: 'fr',
        categories: ['games', 'entertainment', 'utilities'],
        icons: [
          { src: 'pwa-192x192.png', sizes: '192x192', type: 'image/png' },
          { src: 'pwa-512x512.png', sizes: '512x512', type: 'image/png' },
          { src: 'pwa-maskable-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' }
        ],
        shortcuts: [
          { name: 'Campaign Ops', short_name: 'Campaign', url: '/?module=campaign', icons: [{ src: 'pwa-192x192.png', sizes: '192x192' }] },
          { name: 'Campaign Builder', short_name: 'Campaign Builder', url: '/?module=campaignBuilder', icons: [{ src: 'pwa-192x192.png', sizes: '192x192' }] },
          { name: 'Codec Simulator', short_name: 'Codec', url: '/?module=codec', icons: [{ src: 'pwa-192x192.png', sizes: '192x192' }] },
          { name: 'Codec Director', short_name: 'Director', url: '/?module=director', icons: [{ src: 'pwa-192x192.png', sizes: '192x192' }] },
          { name: 'Side Ops', short_name: 'Side Ops', url: '/?module=sideops', icons: [{ src: 'pwa-192x192.png', sizes: '192x192' }] },
          { name: 'VR Missions', short_name: 'VR', url: '/?module=vr', icons: [{ src: 'pwa-192x192.png', sizes: '192x192' }] },
          { name: 'Mission Builder', short_name: 'Builder', url: '/?module=builder', icons: [{ src: 'pwa-192x192.png', sizes: '192x192' }] }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,json,png,svg,ico,woff2}'],
        navigateFallback: 'index.html',
        cleanupOutdatedCaches: true,
        clientsClaim: true,
        skipWaiting: false,
        maximumFileSizeToCacheInBytes: 3 * 1024 * 1024
      },
      devOptions: {
        enabled: false
      }
    })
  ],
  server: {
    port: 5173,
    strictPort: true
  },
  build: {
    chunkSizeWarningLimit: 1600,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('/node_modules/phaser/')) return 'phaser-engine';
          if (id.includes('/node_modules/react/') || id.includes('/node_modules/react-dom/')) return 'react-core';
          if (id.includes('/node_modules/@tauri-apps/')) return 'tauri-runtime';
          if (id.includes('/node_modules/workbox-')) return 'pwa-runtime';
          return undefined;
        }
      }
    }
  },
  clearScreen: false
});
