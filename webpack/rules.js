module.exports = [
  {
    test: /native_modules\/.+\.node$/,
    use: "node-loader"
  },
  {
    test: /\.(svg|jpg|jpeg|png|ico|gif)$/i,
    type: "asset/resource"
  },
  {
    test: /\.(m?js|node)$/,
    parser: { amd: false },
    use: {
      loader: "@vercel/webpack-asset-relocator-loader",
      options: {
        outputAssetBase: "native_modules"
      }
    }
  },
  {
    test: /\.tsx?$/,
    exclude: /(node_modules|\.webpack)/,
    use: {
      loader: "ts-loader",
      options: {
        transpileOnly: true
      }
    }
  }
];
