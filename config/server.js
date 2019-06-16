const path = require('path');
const fs = require('fs');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const config = require('./webpack.prod.config');
const createAlias = require('./createAlias');

let compiler = webpack(config);
let devMiddleWare = webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath
});

let hotMiddleWare = webpackHotMiddleware(compiler, {
  publicPath: config.output.publicPath
}); 

const componentAlias = createAlias(path.resolve(__dirname, '../src/components'));

const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')());

app.use(devMiddleWare);

app.use(hotMiddleWare);

app.use('/static', express.static('/'));

const port = 1218;

/**
 * return markdown README.md file accordingly
 */
app.post('/demo/:compoName', (req, res) => {
  const compoName = req.params.compoName;
  
  if (!compoName) {
    res.status(500).json({ err: '内容标识不存在' });
  }

  if (compoName && componentAlias[compoName]) {
    let readmePath = path.join(componentAlias[compoName], 'demos');
    fs.access(readmePath, (err) => {
      if (err) {
        res.json({ err, message: '内容路径不存在' });
      } else {
        fs.readdir(readmePath, (err, files) => {
          if (err) {
            res.json({ err, message: '寻找文件中发生不可知错误' });
          } else {
            let contents = files
              .filter((file) => {
                return path.extname(file) == '.md';
              })
              .reduce((contents, f) => {
                const content = fs.readFileSync(path.join(readmePath, f), { encoding: 'utf-8' });
                const fOrder = parseInt(f.split('_')[1]);
                if (Number.isNaN(fOrder)) {
                  contents.unshift(content);
                } else {
                  contents.splice(fOrder, 0, content);
                }
                return contents;
              }, []);

            res.status(200).json({ mds: contents });
          }
        })
      }
    })
  }
});

app.listen(port, () => {
  console.log(`server listen on ${port}`);
})