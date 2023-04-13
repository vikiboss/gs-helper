/* eslint-env node */
import { join } from 'node:path'
import { renderer } from 'unplugin-auto-expose'

import { chrome } from '../../.electron-vendors.cache.json'
import { injectAppVersion } from '../../version/inject-app-version-plugin.mjs'

import type { UserConfig } from 'vite'

const PACKAGE_ROOT = __dirname
const PROJECT_ROOT = join(PACKAGE_ROOT, '../..')

export default {
  mode: process.env.MODE,
  root: PACKAGE_ROOT,
  envDir: PROJECT_ROOT,
  resolve: {
    alias: {
      '@/types': join(PACKAGE_ROOT, '..', 'types'),
      '@/constants': join(PACKAGE_ROOT, '..', 'constants'),
      '@/service': join(PACKAGE_ROOT, '..', 'main', 'src', 'services'),
      '@/': join(PACKAGE_ROOT, 'src') + '/'
    }
  },
  base: '',
  server: {
    fs: {
      strict: true
    }
  },
  build: {
    sourcemap: true,
    target: `chrome${chrome}`,
    outDir: 'dist',
    assetsDir: '.',
    rollupOptions: {
      input: join(PACKAGE_ROOT, 'index.html')
    },
    emptyOutDir: true,
    reportCompressedSize: false
  },
  plugins: [
    renderer.vite({
      preloadEntry: join(PACKAGE_ROOT, '../preload/src/index.ts')
    }),
    injectAppVersion()
  ]
} satisfies UserConfig
