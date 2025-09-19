import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        sidePanel: './sidePanel.html', // 指定 HTML 入口
        // 或者直接指定 JS 入口
        // main: './src/main.tsx'
        background: './src/background/index.ts',
        contentScripts: './src/contentScripts/index.ts'
      },
      output: {
        entryFileNames: (chunkInfo) => {
          // 为 background 和 sidePanel 指定固定文件名
          if (['background', 'sidePanel', 'contentScripts'].includes(chunkInfo.name)) {
            return `${chunkInfo.name}.js`
          }
          // 其他文件保持默认命名
          return '[name]-[hash].js'
        },
      }
    },
  }
})
