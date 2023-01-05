import { rmSync } from 'fs'
import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import electron from 'vite-electron-plugin'
import { customStart, loadViteEnv } from 'vite-electron-plugin/plugin'
import renderer from 'vite-plugin-electron-renderer'
import pkg from './package.json'
import inject  from '@rollup/plugin-inject'
rmSync(path.join(__dirname, 'dist-electron'), { recursive: true, force: true })
import { viteMockServe } from 'vite-plugin-mock'
const resolve = dir => path.resolve(process.cwd(), dir)
import { UserConfigExport, ConfigEnv } from 'vite'
// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.join(__dirname, 'src'),
      'styles': path.join(__dirname, 'src/assets/styles'),
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
            hack: `true; @import (reference) "${resolve("src/assets/styles/base.less")}";`,
          },
        javascriptEnabled: true,
      },
    },
  },
  plugins: [
    react(),
    electron({
      include: [
        'electron',
        'preload',
      ],
      transformOptions: {
        sourcemap: !!process.env.VSCODE_DEBUG,
      },
      plugins: [
        ...(process.env.VSCODE_DEBUG
          ? [
            // Will start Electron via VSCode Debug
            customStart(debounce(() => console.log(/* For `.vscode/.debug.script.mjs` */'[startup] Electron App'))),
          ]
          : []),
        // Allow use `import.meta.env.VITE_SOME_KEY` in Electron-Main
        loadViteEnv(),
      ],
    }),
    renderer({
      nodeIntegration: true,
    }),
    inject({
      $request: resolve('src/utils/axios/request.ts' ),
      // $message: resolve('node_modules/antd/es/message/index.js')
    }),
    viteMockServe({
      localEnabled: true,
      mockPath: './mock'
    })
  ],
  server: process.env.VSCODE_DEBUG ? (() => {
    const url = new URL(pkg.debug.env.VITE_DEV_SERVER_URL)
    return {
      host: url.hostname,
      port: +url.port,
    }
  })() : undefined,
  clearScreen: false,
  build: {
    sourcemap: true,
  }
})

function debounce<Fn extends (...args: any[]) => void>(fn: Fn, delay = 299) {
  let t: NodeJS.Timeout
  return ((...args) => {
    clearTimeout(t)
    t = setTimeout(() => fn(...args), delay)
  }) as Fn
}
