'use strcit'

const path = require('path');
let mode = 'production';

if (process.argv[2] && process.argv[2] == 'test') {
    mode = 'test';
}

module.exports = {
    mode,
    dev: {
        env: {
            NODE_ENV: '"development"',
        },
        port: "8000",
        devtool: 'cheap-module-eval-source-map',
        assetsSubDirectory: "static",
        // dbUrl: 'mongodb://localhost:27019/calendar'
    },
    build: {
        env: {
            NODE_ENV: '"production"',
        },
        assetsRoot: path.resolve(__dirname, '../../../../dist/3dlsPromo'),
        port: "8000",
        productionSourceMap: true,
        devtool: '#source-map',
        // Gzip off by default as many popular static hosts such as
        // Surge or Netlify already gzip all static assets for you.
        // Before setting to `true`, make sure to:
        // npm install --save-dev compression-webpack-plugin
        productionGzip: false,
        productionGzipExtensions: ['jsx', 'js', 'css'],
        bundleAnalyzerReport: process.env.npm_config_report,
        // dbUrl: 'mongodb://localhost:27019/calendar'
    }
}