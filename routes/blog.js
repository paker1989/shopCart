const express = require('express')
const fs = require('fs');
const path = require('path');

const router = express.Router();
const _BLOG_LOCAL_CONFIG = require('../blog/env.config');

// 合并分片
function mergeChunks(fileName, chunks, callback) {
    console.log('chunks:' + chunks);
    let chunkPaths = chunks.map(function (name) {
        return path.join(process.env.IMAGESDIR, name)
    });

    // 采用Stream方式合并
    let targetStream = fs.createWriteStream(path.join(process.env.IMAGESDIR, fileName));

    const readStream = function (chunkArray, cb) {
        let path = chunkArray.shift();
        let originStream = fs.createReadStream(path);
        originStream.pipe(targetStream, { end: false });
        originStream.on("end", function () {
            // 删除文件
            fs.unlinkSync(path);
            if (chunkArray.length > 0) {
                readStream(chunkArray, cb);
            } else {
                cb()
            }
        });
    };

    readStream(chunkPaths, callback);
}


const handleError = (req, res, err) => {
    // to do
}

const saveChunkBlog = (req, res) => {
    const {
        fileName,
        data,
        orderIndex,
        finalize
    } = req.body;

    if (finalize) {
        // finalize the save
        console.log(`finalize the file for ${fileName}`);
        res.send({
            message: 'finalized'
        })
    } else {
        const tmpDir = path.join(__dirname, '../blog', _BLOG_LOCAL_CONFIG._CHUNK_FILE_TEMP);

        if (!fs.existsSync(tmpDir)) {
            fs.mkdirSync(tmpDir);
        }

        fs.writeFile(path.join(tmpDir, `${fileName}_${orderIndex}`),
            data, function (err) {
                if (err) {
                    return handleError(req, res, err);
                }
                res.end();
            })
    }
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

router.post('/saveSimpleBlog', saveSimpleBlog);
router.post('/saveChunkBlog', saveChunkBlog);

module.exports = router;