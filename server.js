const path = require('path');
const express = require('express');

const app = express();

const port = 8001;

app.get('/api/products', (req, res) => {
  res.sendFile(path.join(__dirname, 'data', 'products.json'));
});

app.listen(port, () => {
  console.log(`server listen on ${port}`);
})