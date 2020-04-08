// require('./db');


const path = require('path');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/static', express.static(path.join(__dirname, '..', '/assets'))); // serve 本地资源

app.use((err, req, res, next) => {
    console.log(err.stack);
    res.status(500).end();
})

// app.use('/contact', contactRoutes);

const port = 8001;

app.listen(port, () => {
    console.log(`server listen on ${port}`);
})