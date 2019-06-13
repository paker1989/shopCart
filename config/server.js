const path = require('path');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');

const config = require('./webpack.prod.config');
// const createAlias = require('./createAlias');
// console.log(process.env.NODE_ENV);
const isProduction = process.env.NODE_ENV === 'production';

const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(webpackDevMiddleware(webpack(config), {
  publicPath: config.output.publicPath
}));

app.use(express.static('dist'));

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')());

// if (true) {
//   app.get('*', function(req, res, next) {
//     res.sendFile('index.html', { root: '/bxu/api/' })
//   })
// }

const port = 1218;

// app.get('/api/products', (req, res) => {
//   res.sendFile(path.join(__dirname, 'data', 'products.json'));
// });

// app.get('/readme', (req, res) => {
//   console.log(path.resolve(__dirname, 'demo.md'));
//   res.sendFile(path.resolve(__dirname, 'demo.md'));
// });

app.listen(port, () => {
  console.log(`server listen on ${port}`);
  // const alias = createAlias(path.resolve(__dirname, './src'));
  // console.log(alias);
})