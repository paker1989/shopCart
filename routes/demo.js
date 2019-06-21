const express = require('express')
const router = express.Router();
const path = require('path');
const fs = require('fs');

module.exports = function (componentAlias) {
    /**
  * return markdown README.md file accordingly
  */
    const getDemoComponent = (req, res) => {
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
    }

    router.post('/:compoName', getDemoComponent);

    return router;
}