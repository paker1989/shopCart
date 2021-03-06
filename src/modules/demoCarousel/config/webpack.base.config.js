const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');

let htmlWebPackPlugin = new HtmlWebPackPlugin({
  filename: 'index.html',
  template: path.join(__dirname, '../../../', '_templates_/demo_carousel.html'),
  inject: true
});

module.exports = {
  context: path.resolve(__dirname, '../'), // site 目录
  entry: {
    app: './main.js'
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].js',
    publicPath: '/'
  },
  plugins: [
    htmlWebPackPlugin,
  ],
  resolve: {
    extensions: [".js"],
  },
  module: {
    rules: [
      { test: /\.js|jsx$/, use: 'babel-loader', exclude: /node_modules/ },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: "file-loader",
        options: {
          limit: 10000,
          name: 'static/images/[name].[hash:7].[ext]' //打包后存放的位置
        }
      },
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[name].[ext]",
            outputPath: 'static/font/',
            publicPath: '../static/font/'
          },
        },
      },
      {
        test: /\.json$/i,
        type: 'javascript/auto',
        loader: 'json-loader'
      }
    ],
  }
}
