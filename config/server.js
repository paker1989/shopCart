require('../db');

const path = require('path');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const config = require('./webpack.prod.config');

const createAlias = require('./createAlias');
const componentAlias = createAlias(path.resolve(__dirname, '../src/components'));
const demoRoutes = require('../routes/demo')(componentAlias);

const blogRoutes = require('../routes/blog');

let compiler = webpack(config);
let devMiddleWare = webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath
});

let hotMiddleWare = webpackHotMiddleware(compiler, {
    publicPath: config.output.publicPath
});

const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')());

app.use(devMiddleWare);

app.use(hotMiddleWare);

app.use('/static', express.static('/'));

const port = 1218;

// console.log(demoRoutes);
// console.log(blogRoutes);

app.use('/demo', demoRoutes);
app.use('/blog', blogRoutes);

app.listen(port, () => {
    console.log(`server listen on ${port}`);
})