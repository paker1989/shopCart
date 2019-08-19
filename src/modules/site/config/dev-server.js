require('./db');

const path = require('path');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const webpackDevConfig = require('./webpack.dev.config');
const config = require('./config');

const createAlias = require('./createAlias');
const componentAlias = createAlias(path.resolve(__dirname, '../components'));
const demoRoutes = require('../routes/demo')(componentAlias);

const blogRoutes = require('../routes/blog');

let compiler = webpack(webpackDevConfig);
let devMiddleWare = webpackDevMiddleware(compiler, {
    publicPath: webpackDevConfig.output.publicPath
});

let hotMiddleWare = webpackHotMiddleware(compiler, {
    publicPath: webpackDevConfig.output.publicPath
});

const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')());

app.use(devMiddleWare);

app.use(hotMiddleWare);

app.use('/static', express.static(path.join(__dirname, '..', '/assets'))); // serve 本地资源
// app.use('/prefix', express.static(path.join(__dirname, '..', '/assets/images')));

const port = config.dev.port;

app.use('/demo', demoRoutes);
app.use('/blog', blogRoutes);

app.listen(port, () => {
    console.log(`server listen on ${port}`);
})