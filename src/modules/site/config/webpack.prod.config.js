const webpackBaseConfig = require('./webpack.base.config');
const merge = require('webpack-merge');
const webpack = require('webpack');
const path = require('path');

const config = require('./config');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');

const webpackProdConfig = merge(webpackBaseConfig, {
  mode: 'production',
  entry: {
    app: './main.js'
  },
  output: {
    path: config.build.assetsRoot,
    filename: 'js/[name].[chunkhash].js',
    chunkFilename: 'js/[name]~[id].[chunkhash].js',
    publicPath: '/'
  },
  devtool: config.build.productionSourceMap ? config.build.devtool : false,
  optimization: {
    minimizer: [new UglifyJsPlugin({
      uglifyOptions: {
        compress: {}
      },
      sourceMap: config.build.productionSourceMap,
      parallel: true,
    })],
    splitChunks: {
      chunks: 'all',
      // automaticNameDelimiter: '_',
      cacheGroups: {
        highlightjs: { // 项目基本框架等
          chunks: 'all',
          // test: /(react|react-dom|react-dom-router|babel-polyfill|mobx)/,
          test: /(highlightjs)/,
          priority: 100,
          minSize: 0,
          name: 'highlightjs',
        },
        'async-commons': {  // 异步加载公共包、组件等
          chunks: 'async',
          minChunks: 1,
          name: 'async-commons',
          priority: 90,
        },
        vendors: { // 其他同步加载公共包
          chunks: 'all',
          minChunks: 1,
          name: 'vendors',
          priority: 80,
        }
      }
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.build.env
    }),
    // keep module.id stable when vendor modules does not change
    new webpack.HashedModuleIdsPlugin(),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // all options are optional
      filename: 'css/[name].[contenthash].css',
      chunkFilename: 'css/[name][id].[contenthash].css',
      ignoreOrder: false, // Enable to remove warnings about conflicting order
    }),
    new OptimizeCSSPlugin({
      cssProcessorOptions: config.build.productionSourceMap
        ? { safe: true, map: { inline: false } }
        : { safe: true }
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../assets'),
        to: 'static' //可以从devServer.publicPath + to访问
      }
    ])
  ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: false,
            },
          },
          'css-loader',
          'sass-loader'
        ],
      },
    ],
  }

});


if (config.build.productionGzip) {
  const CompressionWebpackPlugin = require('compression-webpack-plugin')

  webpackProdConfig.plugins.push(
    new CompressionWebpackPlugin({
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        config.build.productionGzipExtensions.join('|') +
        ')$'
      ),
    })
  )
}

if (config.build.bundleAnalyzerReport) {
  console.log('reporting');
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackProdConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackProdConfig;