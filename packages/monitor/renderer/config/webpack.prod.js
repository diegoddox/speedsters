const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = merge(common, {
  stats: {
    colors: true,
    hash: true,
    timings: true,
    assets: true,
    chunks: true,
    chunkModules: true,
    modules: true,
    children: true,
  },
  optimization: {
    minimizer: [
      new UglifyJSPlugin({
        sourceMap: true,
        uglifyOptions: {
          compress: {
            inline: false
          }
        }
      }),
    ],
    runtimeChunk: false,
  },
  mode: 'production',
  output: {
    path: path.resolve(__dirname, '../../dist'),
    filename: 'js/[name].bundle.js',
    publicPath: './',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      },
    }),
  ]
});