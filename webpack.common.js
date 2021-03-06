const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const DotenvWebpackPlugin = require('dotenv-webpack');

module.exports = {
  entry: {
    popup: path.resolve('src/popup/popup.jsx'),
    options: path.resolve('src/options/options.jsx'),
    background: path.resolve('src/background/background.js'),
    contentScript: path.resolve('src/content/contentScript.js'),
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/i,
        use: [
          {
            loader: 'source-map-loader',
          },
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        use: ['style-loader', 'css-loader'],
        test: /\.css$/i,
      },
      {
        type: 'asset/resource',
        test: /\.(jpg|jpeg|png|woff|woff2|eot|ttf|svg)$/i,
      },
    ],
  },
  plugins: [
    // dotenv support
    new DotenvWebpackPlugin(),
    // clean (but dont wipe) the dist/ folder when switching prod and dev builds
    new CleanWebpackPlugin({
      cleanStaleWebpackAssets: false,
    }),
    // copy all the files from src/static/ to dist/
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve('src/static'),
          to: path.resolve('dist'),
        },
      ],
    }),
    ...getHtmlPlugins(['popup', 'options']),
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
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
};

function getHtmlPlugins(chunks) {
  return chunks.map(
    (chunk) =>
      new HtmlWebpackPlugin({
        title: 'React Extension',
        filename: `${chunk}.html`,
        chunks: [chunk],
      })
  );
}
