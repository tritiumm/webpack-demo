const Webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');
const WebpackMerge = require('webpack-merge');
const path = require('path');
console.log('////////__dirname' + __dirname)
module.exports = WebpackMerge(webpackConfig, {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    port: 3000,
    hot: true,
    contentBase: '../dist'
  },
  plugins: [
    new Webpack.HotModuleReplacementPlugin(),
  ],
  module: {
    rules: [{
      test: /\.js$/,
      use: path.resolve(path.join(__dirname, '../src'), 'drop-console.js')
    }]
  }
})