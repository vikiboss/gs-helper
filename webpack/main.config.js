const rules = require('./rules')

module.exports = {
  entry: './src/main/index.ts',
  module: {
    rules: [
      ...rules,
      {
        test: /\.(svg|jpg|jpeg|png|ico|gif)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/[hash][ext][query]'
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css', '.json']
  }
}
