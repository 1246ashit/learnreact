import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 5173, // 指定開發服務器的端口
  },
  plugins: [react()],
})
