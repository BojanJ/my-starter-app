import react from '@vitejs/plugin-react';
import path from 'path'; // Needed for aliases
import { defineConfig } from 'vite';

// Import your app configuration
import tailwindcss from '@tailwindcss/vite';
import appConfig from './src/config/app.config';
import { VitePWA } from 'vite-plugin-pwa'; // Import VitePWA
import pwaIcons from './public/icons/icons.json';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate', // Automatically update the service worker
      devOptions: {
        enabled: true, // Enable PWA in development mode for easier debugging
        type: 'module', // Use module service worker (recommended)
      },
      manifest: {
        name: appConfig.appName,
        short_name: appConfig.appShortName,
        description: appConfig.appDescription,
        theme_color: '#ffffff', // Your app's primary theme color
        background_color: '#ffffff', // Background color for the splash screen
        display: 'standalone', // Makes the app feel more native (hides browser UI)
        start_url: '/', // The URL where the PWA will start
        scope: '/', // Scope of the PWA (what URLs it controls)
        icons: pwaIcons.icons.map((icon: { src: string; sizes: string }) => ({
          ...icon,
          src: `/icons/${icon.src}`,
          type: 'image/png',
        })), // Your generated icons will go here
      },
      workbox: {
        // Options for Workbox, which generates the service worker
        globPatterns: ['**/*.{js,css,html,ico,png,svg,webp,woff2,json,xml}'], // Cache these file types
        // Add runtime caching for API calls (important for offline data)
        runtimeCaching: [
          {
            urlPattern: ({ url }) => url.origin === 'https://jsonplaceholder.typicode.com', // Match your API origin
            handler: 'StaleWhileRevalidate', // Serve from cache while revalidating in background
            options: {
              cacheName: 'api-cache',
              expiration: {
                maxEntries: 50, // Max number of API responses to cache
                maxAgeSeconds: 60 * 60 * 24 * 7, // Cache for 7 days
              },
              cacheableResponse: {
                statuses: [0, 200], // Cache opaque responses (0) and successful (200)
              },
            },
          },
          {
            // @ts-expect-error self is defined in service worker context
            urlPattern: ({ url }) => url.origin !== self.location.origin, // Cache third-party assets (e.g., Google Fonts, CDN)
            handler: 'CacheFirst', // Prioritize cache for these assets
            options: {
              cacheName: 'static-assets-cache',
              expiration: {
                maxEntries: 60,
                maxAgeSeconds: 60 * 60 * 24 * 30, // Cache for 30 days
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],
        // Optional: Denylist specific routes from being navigated to offline if they must be online
        // navigateFallbackDenylist: [/\/api\//],
      },
      includeAssets: ['**/*'],
    }),
  ],
  // Define global constant replacements
  define: {
    'import.meta.env.VITE_APP_NAME': JSON.stringify(appConfig.appName),
    'import.meta.env.VITE_APP_DESCRIPTION': JSON.stringify(appConfig.appDescription),
    // You can expose other config values here if needed in index.html or globally
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    sourcemap: false, // Set to true for debugging production builds, but increases bundle size
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-components': [
            '@radix-ui/react-avatar',
            '@radix-ui/react-dropdown-menu',
            '@radix-ui/react-dialog',
            '@radix-ui/react-label',
            '@radix-ui/react-slot',
            'class-variance-authority',
            'clsx',
            'tailwind-merge',
          ],
          'data-management': [
            '@tanstack/react-query',
            '@tanstack/react-table',
            '@tanstack/react-form',
            'zustand',
          ],
          utils: ['date-fns', 'dayjs', 'zod', 'lucide-react'],
          i18n: ['i18next', 'react-i18next'],
        },
        // Better chunk naming pattern
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
      },
    },
  },
});
