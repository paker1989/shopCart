const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');

let htmlWebPackPlugin = new HtmlWebPackPlugin({
  filename: 'index.html',
  template: path.join(__dirname, '../../../', '_templates_/site.html')
});

module.exports = {
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'main.js',
    publicPath: '/'
  },
  plugins: [
    htmlWebPackPlugin,
  ],
  resolve: {
    extensions: [".ts", ".tsx", ".js"]
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
      },
      {
        test: /\.json$/i,
        type: 'javascript/auto',
        loader: 'json-loader'
      },
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "ts-loader"
          }
        ]
      },
      // {
      //   enforce: "pre",
      //   test: /\.js$/,
      //   loader: "source-map-loader"
      // }
    ],
  }
}
