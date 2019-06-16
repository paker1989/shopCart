const webpackBaseConfig = require('./webpack.base.config');
const merge = require('webpack-merge');
const webpack = require('webpack');
const path = require('path');

const CopyWebpackPlugin = require('copy-webpack-plugin');

const webpackProdConfig = merge(webpackBaseConfig, {
  mode: 'development',
  entry: ['webpack-hot-middleware/client.js', './src/index.js'],
  // entry: ['./src/index.js'],
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle_[hash].js',
    // publicPath: '/bxu/api/'
    publicPath: '/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': '"production"'
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../data'),
        to: '' //可以从devServer.publicPath + to访问
      }
    ])   
  ]
});

module.exports = webpackProdConfig;