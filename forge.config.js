module.exports = {
  packagerConfig: {
    appBundleId: 'moe.viki.genshin-helper',
    appCopyright: 'Viki. GPL-3.0 license',
    icon: './src/assets/icon.ico'
  },
  makers: [
    {
      name: '@electron-forge/maker-zip',
      platforms: ['win32', 'linux', 'darwin']
    }
  ],
  plugins: [
    {
      name: '@electron-forge/plugin-webpack',
      config: {
        devContentSecurityPolicy:
          "default-src 'self' 'unsafe-inline' data:; connect-src *; script-src 'self' 'unsafe-eval' 'unsafe-inline' data:; img-src * data:",
        mainConfig: './webpack/main.config.js',
        renderer: {
          config: './webpack/renderer.config.js',
          entryPoints: [
            {
              html: './src/render/index.html',
              js: './src/render/index.tsx',
              name: 'main_window',
              preload: {
                js: './src/preload.ts'
              }
            }
          ]
        }
      }
    }
  ]
}
