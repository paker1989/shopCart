// require('./db');


const path = require('path');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
// const webpack = require('webpack');
// const webpackDevMiddleware = require('webpack-dev-middleware');
// const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./config');
// const webpackDevConfig = require('./webpack.dev.config');
const contactRoutes = require('../routes/contacts');

// let compiler = webpack(webpackDevConfig);
// let devMiddleWare = webpackDevMiddleware(compiler, {
//     publicPath: webpackDevConfig.output.publicPath
// });

// let hotMiddleWare = webpackHotMiddleware(compiler, {
//     publicPath: webpackDevConfig.output.publicPath
// });

const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// handle fallback for HTML5 history API
// app.use(require('connect-history-api-fallback')());

// app.use(devMiddleWare);

// app.use(hotMiddleWare);

app.use('/static', express.static(path.join(__dirname, '..', '/assets'))); // serve 本地资源

// app.use('/events', eventRoutes);

app.use((err, req, res, next) => {
    console.log(err.stack);
    res.status(500).end();
})

app.use('/contact', contactRoutes);

// const port = config.dev.port;
const port = 8001;

app.listen(port, () => {
    console.log(`server listen on ${port}`);
})