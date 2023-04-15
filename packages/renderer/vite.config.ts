/* eslint-env node */
import { join } from 'node:path'

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
    assetsDir: 'src/assets',
    rollupOptions: {
      input: join(PACKAGE_ROOT, 'index.html'),
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor'
          }
        }
      }
    },
    emptyOutDir: true,
    reportCompressedSize: false
  },
  plugins: [injectAppVersion()]
} satisfies UserConfig
