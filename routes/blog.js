const express = require('express')
const fs = require('fs');
const path = require('path');

const router = express.Router();
const _BLOG_LOCAL_CONFIG = require('../blog/env.config');

const handleError = (req, res, err) => {
    // to do
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

module.exports = router;