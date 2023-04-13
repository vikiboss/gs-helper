import { builtinModules } from 'node:module'
import { join } from 'node:path'

// import { node } from '../../.electron-vendors.cache.json'
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
      '/@/': join(PACKAGE_ROOT, 'src') + '/'
    }
  },
  build: {
    ssr: true,
    sourcemap: 'inline',
    target: `node18`,
    outDir: 'dist',
    assetsDir: '.',
    minify: process.env.MODE !== 'development',
    lib: {
      entry: 'src/index.ts',
      formats: ['cjs']
    },
    rollupOptions: {
      /**
       * Workaround for vitejs/vite#12012
       * See https://github.com/vitejs/vite/issues/12012
       */
      preserveEntrySignatures: 'strict',
      output: {
        exports: 'named',
        preserveModules: true,
        preserveModulesRoot: join(PACKAGE_ROOT, 'src'),
        entryFileNames: (info) => `${info.name}.cjs`
      },
      external: (src) => {
        const name = src.split('/')[0]
        const externalNames = [
          ...builtinModules,
          ...builtinModules.map((name) => `node:${name}`),
          'electron'
        ]
        return externalNames.includes(name)
      }
    },
    emptyOutDir: true,
    reportCompressedSize: false
  },
  ssr: {
    noExternal: true
  },
  plugins: [injectAppVersion()]
} satisfies UserConfig
