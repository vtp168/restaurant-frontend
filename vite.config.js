import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    tailwindcss()
  ],
  server: {
    port: 7000,
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@public': fileURLToPath(new URL('./src/views/public', import.meta.url)), // define for public folder in view
      '@admin': fileURLToPath(new URL('./src/views/admin', import.meta.url)), // define for admin folder in view,
      '@public_folder': fileURLToPath(new URL('./public', import.meta.url)) // define public folder
    },
  },
})
