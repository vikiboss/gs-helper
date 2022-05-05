module.exports = {
  packagerConfig: {},
  makers: [
    {
      name: "@electron-forge/maker-squirrel",
      config: {
        name: "genshin_helper"
      }
    },
    {
      name: "@electron-forge/maker-zip",
      platforms: ["darwin"]
    },
    {
      name: "@electron-forge/maker-deb",
      config: {}
    },
    {
      name: "@electron-forge/maker-rpm",
      config: {}
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
              js: "./src/index.tsx",
              name: "main_window",
              preload: {
                js: "./src/preload.ts"
              }
            }
          ]
        }
      }
    ]
  ]
};
