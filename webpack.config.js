const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/test.js',
  module: {},
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  // where to place files once it's done being built
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
