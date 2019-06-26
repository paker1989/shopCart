const multer = require('multer');
const path = require('path');
const fs = require('fs');

const envConfig = require('../blog/env.config');

const tmpDir = path.join(__dirname, '../blog', envConfig._CHUNK_FILE_TEMP);
const finalDir =  path.join(__dirname, '../blog', envConfig._ROOT_DIR);
const chunkFlag = new RegExp(/_chunk_/, 'i');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (!fs.existsSync(tmpDir)) {
            fs.mkdirSync(tmpDir);
        }
        if (chunkFlag.test(file.originalname)) {
            cb(null, tmpDir);
        } else {
            cb(null, finalDir);
        }
    },

    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
})

module.exports = multer({
    storage,
    limits: { fieldSize: 25 * 1024 * 1024 }
});