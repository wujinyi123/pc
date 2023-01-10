import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import WindiCSS from 'vite-plugin-windicss'

import path from "path"

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "src")
    }
  },

  server: {
    proxy: {
      '/api/common': {
        target: 'http://localhost:9100',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api\/common/, '')
      },
      '/api/file': {
        target: 'http://localhost:9200',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api\/file/, '')
      }
    }
  },

  plugins: [vue(), WindiCSS()]
})
