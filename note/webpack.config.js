const path = require('path');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');

let htmlWebPackPlugin = new HtmlWebPackPlugin({
  filename: 'index.html',
  template: path.resolve(__dirname, 'src/index.html')
});

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
    publicPath: '/'
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 1218,
    open: false,
    historyApiFallback: true,
  },
  plugins: [
    htmlWebPackPlugin,
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, './data'),
        to: '' //可以从devServer.publicPath + to访问
      }
    ])
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
      // {
      //   test: /\.md$/,
      //   use: [
      //       'babel-loader',
      //       {
      //           loader: require.resolve('react-markdown-doc-loader'),
      //           options: {
      //               jsTemplate: path.join(__dirname, './react-template.js'),
      //               renderers: {
      //                   markdown: 'Markdown',
      //                   style: 'Style',
      //                   demo: 'Demo'
      //               }
      //           }
      //       },
      //       'markdown-doc-loader'
      //   ]
      // }
    ],   
  }
}