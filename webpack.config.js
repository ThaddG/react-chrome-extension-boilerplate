const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  entry: {
    popup: path.resolve('src/popup/popup.jsx'),
    options: path.resolve('src/options/options.jsx')
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: [
          {
            loader: 'source-map-loader',
          },
          {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
                '@babel/preset-react'
              ]
            }
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    // copy all the files from src/static/ to dist/
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve('src/static'),
          to: path.resolve('dist'),
        },
      ],
    }),
    ...getHtmlPlugins([
      'popup',
      'options'
    ])
    ,
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  // where to place files once it's done being built
  output: {
    filename: '[name].js',
    path: path.resolve('dist'),
    clean: true,
  },
};

function getHtmlPlugins(chunks) {
  return chunks.map(chunk => (
    new HtmlWebpackPlugin({
      title: "React Extension",
      filename: `${chunk}.html`,
      chunks: [chunk]
    })
  ))
}