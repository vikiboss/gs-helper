#!/usr/bin/env node
import electronPath from 'electron'
import { spawn } from 'node:child_process'
import { build, createServer } from 'vite'

import type { ChildProcess } from 'node:child_process'
import type { LogLevel, ViteDevServer } from 'vite'

const mode = (process.env.MODE ??= 'development') as 'production' | 'development'
const logLevel: LogLevel = 'warn'

function setupMainPackageWatcher(server: ViteDevServer) {
  process.env.VITE_DEV_SERVER_URL = server.resolvedUrls!.local[0]

  let electronApp: ChildProcess | null = null

  return build({
    mode,
    logLevel,
    configFile: 'packages/main/vite.config.ts',
    build: {
      watch: {}
    },
    plugins: [
      {
        name: 'reload-app-on-main-package-change',
        writeBundle() {
          /** Kill electron if process already exist */
          if (electronApp !== null) {
            electronApp.removeListener('exit', process.exit)
            electronApp.kill('SIGINT')
            electronApp = null
          }

          /** Spawn new electron process */
          electronApp = spawn(String(electronPath), ['--inspect', '.'], { stdio: 'inherit' })

          /** Stops the watch script when the application has been quit */
          electronApp.addListener('exit', process.exit)
        }
      }
    ]
  })
}

function setupPreloadPackageWatcher({ ws }: ViteDevServer) {
  return build({
    mode,
    logLevel,
    configFile: 'packages/preload/vite.config.ts',
    build: {
      watch: {}
    },
    plugins: [
      {
        name: 'reload-page-on-preload-package-change',
        writeBundle() {
          ws.send({ type: 'full-reload' })
        }
      }
    ]
  })
}

const renderWatchServer = await createServer({
  mode,
  logLevel,
  configFile: 'packages/renderer/vite.config.ts'
}).then((server) => server.listen())

await setupPreloadPackageWatcher(renderWatchServer)
await setupMainPackageWatcher(renderWatchServer)
