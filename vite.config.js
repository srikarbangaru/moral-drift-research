import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/moral-drift-research/',
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          plotly: ['plotly.js', 'react-plotly.js'],
          react: ['react', 'react-dom'],
        },
      },
    },
    chunkSizeWarningLimit: 2000,
  },
})
