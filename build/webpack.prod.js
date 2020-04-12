const webpackConfig = require('./webpack.config.js');
const WebpackMerge = require('webpack-merge');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const OptimizeCssAssestsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const firstPlugin = require('../src/webpack-firstPlugin.js');

module.exports = WebpackMerge(webpackConfig, {
  mode: 'production',
  devtool: 'cheap-module-source-map',
  plugins: [
    new CopyWebpackPlugin([{
      from: path.resolve(__dirname, '../public'),
      to: path.resolve(__dirname, '../dist')
    }]),
    new firstPlugin()
  ],
  optimization: {
    minimizer: [
      new UglifyJsPlugin({ // minize js
        cache: true,
        parallel: true,
        sourceMap: true
      }),
      new OptimizeCssAssestsPlugin({})
    ],
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        libs: {
          name: 'chunk-libs',
          test: /[\\/]node_modules[\\/]/,
          priority: 10,
          chunks: 'initial'
        }
      }
    }
  }
}) 