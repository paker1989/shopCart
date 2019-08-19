const webpackBaseConfig = require('./webpack.base.config');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const merge = require('webpack-merge');
const path = require('path');

const webpackdevConfig = merge(webpackBaseConfig, {
  mode: 'development',
  entry: ['./src/index.js'],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 1218,
    open: false,
    historyApiFallback: true,
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        from: path.join(__dirname, '..', './data'),
        to: '' //可以从devServer.publicPath + to访问
      }
    ])
  ],
});

module.exports = webpackdevConfig;