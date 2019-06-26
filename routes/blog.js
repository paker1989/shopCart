const express = require('express')
const fs = require('fs');
const path = require('path');

const router = express.Router();
const _BLOG_LOCAL_CONFIG = require('../blog/env.config');
const multerUpload = require('../config/multer.config');

// 合并分片
function mergeChunks(fileName, chunks, callback) {
    let chunkPaths = chunks.map(function (name) {
        return path.join(__dirname, '../blog',
            _BLOG_LOCAL_CONFIG._CHUNK_FILE_TEMP, name)
    });

    // 采用Stream方式合并
    let targetStream = fs.createWriteStream(path.join(__dirname, '../blog',
        _BLOG_LOCAL_CONFIG._ROOT_DIR, fileName));

    const readStream = function (chunkArray, cb) {
        let path = chunkArray.shift();
        let originStream = fs.createReadStream(path);
        originStream.pipe(targetStream, { end: false });
        originStream.on("end", function () {
            fs.unlinkSync(path);  // 删除文件
            if (chunkArray.length > 0) {
                readStream(chunkArray, cb);
            } else {
                cb();
            }
        });
    };

    readStream(chunkPaths, callback);
}

const saveSimpleBlog = (req, res) => {
    const { fileName, content } = req.body;

    fs.writeFile(path.join(__dirname, '../blog',
        _BLOG_LOCAL_CONFIG._ROOT_DIR, fileName), content, function (err) {
            if (err) {
                return handleError(req, res, err);
            }

            res.send({
                message: 'OK',
            });
        })
}

const finalizeChunckFile = (req, res) => {
    const { finalize, fileName } = req.body;
    if (finalize) {
        fs.readdir(path.join(__dirname, '../blog',
            _BLOG_LOCAL_CONFIG._CHUNK_FILE_TEMP), function (err, files) {
                if (err) {
                    handleError(req, res, err);
                    return;
                }

                const getOrderIndex = (_chunK_name) => {
                    return parseInt(_chunK_name.replace(`${fileName}_chunk_`, ''));
                }

                let chunks = files
                    .filter(file => file.startsWith(fileName))
                    .sort((a, b) => {
                        return getOrderIndex(a) - getOrderIndex(b);
                    });

                mergeChunks(fileName, chunks, function (err) {
                    if (err) {
                        handleError(req, res, err);
                        return;
                    }
                    res.send({
                        message: 'OK'
                    });
                });
            });
    }
}

const saveBigBlog = (req, res) => {
    res.send({
        message: 'OK',
    });
}

const saveChunkBlog = (req, res) => {
    res.end();
}

const handleError = (req, res, err) => {
    if (err) {
        console.log(err);
    }
    res.send({ err });
}

router.post('/saveSimpleBlog', saveSimpleBlog);
router.post('/saveBigBlog', multerUpload.single('bigFile'), saveBigBlog);
router.post('/saveChunkBlog', multerUpload.single('chunkedFile'), saveChunkBlog);
router.post('/finalizeChunckFile', finalizeChunckFile);

module.exports = router;