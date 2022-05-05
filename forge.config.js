module.exports = {
  packagerConfig: {
    appBundleId: "org.viki.genshin.helper",
    appCopyright: "Viki. MIT licese",
    icon: "./assets/icon.ico"
  },
  makers: [
    {
      name: "@electron-forge/maker-zip",
      platforms: ["win32", "linux", "darwin"]
    }
  ],
  plugins: [
    [
      "@electron-forge/plugin-webpack",
      {
        devContentSecurityPolicy: `default-src 'self' 'unsafe-inline' data:; script-src 'self' 'unsafe-eval' 'unsafe-inline' data:`,
        mainConfig: "./webpack/main.config.js",
        renderer: {
          config: "./webpack/renderer.config.js",
          entryPoints: [
            {
              html: "./index.html",
              js: "./src/render/index.tsx",
              name: "main_window",
              preload: {
                js: "./src/preload/index.ts"
              }
            }
          ]
        }
      }
    ]
  ]
};
