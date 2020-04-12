// webpack.config.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// clean the previous dist file
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// extract css as independent files <link>
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const vueLoaderPlugin = require('vue-loader/lib/plugin');
const Webpack = require('webpack');
const isDev = process.argv.indexOf('--mode=production') === -1;
module.exports = {
  entry: ['@babel/polyfill', path.resolve(__dirname, '../src/main.js')], // entry file
  output: {
    filename: '[name].[hash:8].js', // built file
    path: path.resolve(__dirname, '../dist')
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html')
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: isDev ? "[name].css" : "[name].[hash:8].css",
      chunkFilename: isDev ? "[id].css" : "[id].[hash:8].css"
    }),
    new vueLoaderPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins:  [require('autoprefixer')]
            }
        }] // from right to left
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader', {
          loader: 'postcss-loader',
          options: {
            plugins:  [require('autoprefixer')]
          }
        }, 'less-loader']
      },
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        },
        exclude: /node_modules/
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10240,
            fallBack: {
              loader: 'file-loader',
              options: {
                name: 'img/[name].[hash:8].[ext]'
              }
            }
          }
        }]
      },
      {
        test: /\.vue$/,
        use: ['vue-loader']
      }
    ]
  }
}