import { builtinModules } from 'node:module'
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
  build: {
    ssr: true,
    sourcemap: 'inline',
    target: `chrome${chrome}`,
    minify: process.env.MODE !== 'development',
    lib: {
      entry: 'src/index.ts',
      formats: ['cjs']
    },
    rollupOptions: {
      external: (src: string) => {
        const name = src.split('/')[0]
        const externalNames = [
          ...builtinModules,
          ...builtinModules.map((name) => `node:${name}`),
          'electron'
        ]
        return externalNames.includes(name)
      }
    },
    emptyOutDir: true
  },
  ssr: {
    noExternal: true
  },
  plugins: [injectAppVersion()]
} satisfies UserConfig
