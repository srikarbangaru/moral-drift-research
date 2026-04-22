import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/moral-shift-research/',
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          plotly: ['plotly.js-basic-dist-min', 'react-plotly.js'],
          react: ['react', 'react-dom'],
        },
      },
    },
    chunkSizeWarningLimit: 2000,
  },
})
