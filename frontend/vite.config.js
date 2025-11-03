import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// ✅ Adjusted root to point to the correct frontend source
export default defineConfig({
  plugins: [react()],
  root: './backend/erp_project/kamal-erp-main',
  build: {
    outDir: '../../dist',   // output to frontend/dist
    emptyOutDir: true,
  },
  server: {
    port: 5173,
    host: true,
  },
})
