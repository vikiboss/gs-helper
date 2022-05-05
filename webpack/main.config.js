module.exports = {
  entry: './main.ts',
  module: {
    rules: require('./rules'),
  },
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css', '.json'],
  },
};
