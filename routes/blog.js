const express = require('express')
const fs = require('fs');
// const upload = require('./multerConfig')
// const Note = require('../model/note')
// const Photo = require('../model/photo')
// const url = require('url')
// const _ = require('lodash')

const router = express.Router();

const saveBlog = (req, res) => {
    const body = req.body;
    console.log(body);
    const { data } = req.body.data;
    
    fs.writeFile('test.md', data, {
        encoding: 'utf-8'
    }, function (err, data) {
        res.send({
            message: 'OK',
            data
        })
    })

}

router.post('/saveBlog', saveBlog);

module.exports = router;