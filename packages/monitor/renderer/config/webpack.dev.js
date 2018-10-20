const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  devtool: 'inline-source-map',
  devServer: {
    inline: true,
    port: 1337,
  },
  mode: 'development',
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
});