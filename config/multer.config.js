const multer = require('multer');
const path = require('path');
const fs = require('fs');

const envConfig = require('../blog/env.config');

const tmpDir = path.join(__dirname, '../blog', envConfig._CHUNK_FILE_TEMP);
// console.log(tmpDir);

if (!fs.existsSync(tmpDir)) {
    fs.mkdirSync(tmpDir);
}

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, tmpDir);
    },

    filename: function (req, file, cb) {
        const { orderIndex } = req.body;
        console.log('orderIndex = ' + orderIndex);
        console.log('filename = ' + file.filename);
        console.log('originalname = ' + file.originalname);

        cb(null, file.originalname);
    }
})

module.exports = multer({
    storage,
    limits: { fieldSize: 25 * 1024 * 1024 }
});