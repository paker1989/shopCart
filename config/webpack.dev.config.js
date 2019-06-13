const webpackBaseConfig = require('./webpack.base.config');
const merge = require('webpack-merge');
const path = require('path');

const webpackdevConfig = merge(webpackBaseConfig, {
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 1218,
    open: false,
    historyApiFallback: true,
  }
});

module.exports = webpackdevConfig;