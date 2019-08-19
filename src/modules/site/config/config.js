'use strcit'

const path = require('path');

module.exports = {
    dev: {
        env: {
            NODE_ENV: '"development"',
        },
        port: "1219",
        devtool: 'cheap-module-eval-source-map',
        assetsSubDirectory: "static"
    },
    build: {
        env: "'production'",
        port: "1219"
    }
}