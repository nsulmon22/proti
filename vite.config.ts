import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // The preview tool hands out a free port via PORT; plain `npm run dev` keeps 5173.
  server: { port: Number(process.env.PORT) || 5173 },
})
