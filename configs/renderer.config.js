const rules = require("./rules");
const plugins = require("./plugins");

module.exports = {
  module: {
    rules: [
      ...rules,
      {
        test: /\.(svg|jpg|jpeg|png|ico|gif|woff2)$/i,
        type: "asset/inline"
      },
      {
        test: /\.less$/i,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: {
                localIdentName: "[name]__[local]--[hash:base64:5]",
                exportLocalsConvention: "camelCase"
              }
            }
          },
          "less-loader"
        ]
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  plugins: plugins,
  resolve: {
    extensions: [".js", ".ts", ".jsx", ".tsx", ".css"]
  }
};
