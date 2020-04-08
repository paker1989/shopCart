// require('./db');

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./config');
const webpackDevConfig = require('./webpack.dev.config');

let compiler = webpack(webpackDevConfig);
let devMiddleWare = webpackDevMiddleware(compiler, {
    publicPath: webpackDevConfig.output.publicPath,
});

let hotMiddleWare = webpackHotMiddleware(compiler, {
    publicPath: webpackDevConfig.output.publicPath,
});

const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(devMiddleWare);

app.use(hotMiddleWare);

app.use((err, req, res, next) => {
    console.log(err.stack);
    res.status(500).end();
});

const port = config.dev.port;

app.listen(port, () => {
    console.log(`server listen on ${port}`);
});
