const path = require('path');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');

let htmlWebPackPlugin = new HtmlWebPackPlugin({
  filename: 'index.html',
  template: path.join(__dirname, '..', 'src/index.html')
});

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'main.js',
    publicPath: '/'
  },
  plugins: [
    htmlWebPackPlugin,
    // new CopyWebpackPlugin([
    //   {
    //     from: path.join(__dirname, '..', './data'),
    //     to: '' //可以从devServer.publicPath + to访问
    //   }
    // ])
  ],
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
      },
      {
        test: /\.json$/i,
        type: 'javascript/auto',
        loader: 'json-loader'
      },
    ],   
  }
}
