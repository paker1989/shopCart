const path = require('path');
const express = require('express');
const cors = require('cors');
const createAlias = require('./createAlias');

const app = express();
app.use(cors());

const port = 8001;

app.get('/api/products', (req, res) => {
  res.sendFile(path.join(__dirname, 'data', 'products.json'));
});

app.get('/readme', (req, res) => {
  console.log(path.resolve(__dirname, 'demo.md'));
  res.sendFile(path.resolve(__dirname, 'demo.md'));
});

app.listen(port, () => {
  console.log(`server listen on ${port}`);
  const alias = createAlias(path.resolve(__dirname, './src'));
  console.log(alias);
})