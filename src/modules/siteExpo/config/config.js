'use strcit'

const path = require('path');

module.exports = {
    dev: {
        env: {
            NODE_ENV: '"development"',
        },
        port: "1221",
        devtool: 'cheap-module-eval-source-map',
        assetsSubDirectory: "static"
    },
    build: {
        env: {
            NODE_ENV: '"production"',
        },
        assetsRoot: path.resolve(__dirname, '../../../../dist/siteExpo'),
        productionSourceMap: true,
        devtool: '#source-map',
        productionGzip: false,
        productionGzipExtensions: ['jsx', 'js', 'css'],
        bundleAnalyzerReport: process.env.npm_config_report
    },
    demo: {
        env: {
            NODE_ENV: '"production"',
        },
        assetsRoot: path.resolve(__dirname, '../../../../docs'),
        productionSourceMap: true,
        devtool: '#source-map',
        productionGzip: false,
        productionGzipExtensions: ['jsx', 'js', 'css'],
        bundleAnalyzerReport: process.env.npm_config_report
    }
}