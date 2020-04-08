const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');

let htmlWebPackPlugin = new HtmlWebPackPlugin({
  filename: 'index.html',
  template: path.join(__dirname, '../../../', '_templates_/wef.html'),
  inject: true,
  chunksSortMode: function (a, b) {
    var order = ["app", "polyfill"];
    return order.indexOf(b.names[0]) - order.indexOf(a.names[0]);
  }
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
        test: /\.css|scss$/,
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
          // limit: 10000,
          name: '[name].[hash:7].[ext]', //打包后存放的位置
          outputPath: 'static/img/',
          publicPath: '../static/img/'
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
