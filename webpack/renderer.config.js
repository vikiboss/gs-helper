const rules = require("./rules");
const plugins = require("./plugins");

module.exports = {
  module: {
    rules: [
      ...rules,
      {
        test: /\.less$/i,
        use: ["style-loader", "css-loader", "less-loader"]
      },
      {
        test: /\.css$/,
        use: [{ loader: "style-loader" }, { loader: "css-loader" }]
      }
    ]
  },
  plugins: plugins,
  resolve: {
    extensions: [".js", ".ts", ".jsx", ".tsx", ".css"]
  }
};
