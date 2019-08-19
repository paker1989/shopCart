const webpackBaseConfig = require('./webpack.base.config');
const merge = require('webpack-merge');
const webpack = require('webpack');
const path = require('path');

const CopyWebpackPlugin = require('copy-webpack-plugin');

const webpackProdConfig = merge(webpackBaseConfig, {
  mode: 'production',
  entry: ['./main.js'],
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle_[hash].js',
    // publicPath: '/bxu/api/'
    publicPath: '/'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': '"production"'
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../assets'),
        to: '' //可以从devServer.publicPath + to访问
      }
    ]),
    new webpack.HotModuleReplacementPlugin(),
  ]
});

module.exports = webpackProdConfig;