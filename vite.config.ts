import { spawn } from 'child_process'

import reactRefresh from '@vitejs/plugin-react-refresh'
import { defineConfig } from 'vite'
import transformExternals from 'vite-plugin-transform-externals'

import { externals } from './config/externals'
import { devServer, proxy } from './config/server'
import { injectEntry } from './script/injectEntry'

export default defineConfig({
  plugins: [
    /** 将externals依赖文件与入口文件注入body */
    {
      name: 'inject-cdn-externals',
      // enforce: 'pre',
      transformIndexHtml(html) {
        html = injectEntry(html)
        return {
          html,
          tags: [],
        }
      },
    },
    transformExternals({
      externals,
    }),
    reactRefresh(),
  ],
  server: {
    port: devServer.port,
    proxy,
  },
})

if (process.env.NODE_ENV !== 'production') {
  devServer.after()
  spawn('tsc', ['--watch'], { stdio: 'inherit' })
}
