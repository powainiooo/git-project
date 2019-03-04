const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const webpack = require('webpack')

module.exports = {
  entry: './index.js',
  output: {
    filename: '[name][hash].js',
    publicPath: '',
    path: path.resolve(__dirname, 'dist')
  },
  devtool: 'inline-source-map',
  devServer: {
    publicPath: '/',
    hot: true
  },
  plugins: [
      new CleanWebpackPlugin(['dist']),
      new HtmlWebpackPlugin({
        title: 'test-postcss',
        filename: 'index.html',
        template: 'index.html',
        inject: true
      }),
      new webpack.HotModuleReplacementPlugin(),
      new CopyWebpackPlugin([
        {
          from: path.resolve(__dirname, '../static'),
          to: 'static',
          ignore: ['.*']
        }
      ])
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader']
      }
    ]
  }
}