const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  target: 'electron-renderer',
  entry: {
    app: [
      path.resolve(__dirname, '../src', 'index.tsx'),
    ],
    vendor: [
      'react',
      'react-dom',
      'react-redux',
      'redux',
      'styletron-engine-atomic',
      'styletron-react',
    ]
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      }, {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader',
      }, {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      }, {
        test: /\.svg$/,
        loader: 'svg-sprite-loader',
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
    alias: {
      Common: path.resolve(__dirname, '../src/Common/'),
      Containers: path.resolve(__dirname, '../src/Containers/'),
      Utils: path.resolve(__dirname, '../src/Utils/'),
      denormalize: path.resolve(__dirname, '../../../core/src/denormalize/'),
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../src', 'index.html'),
      inject: 'body',
    }),
  ],
}