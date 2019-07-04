import React from 'react';
import axios from 'axios';

import MarkdownRender from '../../utils/MarkdownRender';
import DemoCodeRender from '../../utils/DemoCodeRender/DemoCodeRender';

import Upload from '../../../components/fileUpload';
import { _CHUNK_SIZE, _BODY_DATA_LIMIT } from '../../../components/fileUpload/utils/util';
import { sendFileByChunk } from '../../utils/chunkFileUtil';

const md_democode =
    `
    <div style={{ margin: '20px' }}>
        <Upload maxAmount={5} exeUpload={this.handleUpload} />
    </div>
  `
class UploadDemo extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            mdDescription: '',
        }
    }

    /**
     * test only
     */
    handleUploadFilepond = (element) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                let random = Math.random() * 10;
                if (random >= 5) {
                    console.log('resolve');
                    resolve();
                } else {
                    console.log('reject');
                    reject();
                }
                // reject();
            }, 2000);
        })
    }

    /**
     * test only
     */
    handleUpload = ({ texts = [] }) => {
        if (texts.length === 0)
            return;

        const { data, file } = texts[0];

        const toSend = {
            content: data,
            fileName: file.name
        };

        return new Promise((resolve) => {
            if (file.size < _BODY_DATA_LIMIT) { // small file, send as json, parsed by bodyParser
                axios
                    .post('/blog/saveSimpleBlog', toSend)
                    .then((res) => {
                        resolve();
                    });
            } else if (file.size <= _CHUNK_SIZE) { // medium file, send singe file via multer as formadata
                let formData = new FormData();
                formData.set('bigFile', file);
                axios({
                    method: 'post',
                    url: '/blog/saveBigBlog',
                    config: { headers: { 'Content-Type': 'multipart/form-data' } },
                    data: formData,
                    onUploadProgress: (pevt) => {
                        console.log(pevt);
                    }
                })
                    .then((res) => {
                        resolve();
                    });
            } else { // huge file, chunk file and send separetely via multer
                console.warn(`file size ${file.size} is over small file size's limit.`);
                /**
                 * @returns save file promises
                 * @param {*} chunkedFile 
                 * @param {*} orderIndex 
                 */
                const cb = function (chunkedFile, orderIndex) {
                    let formData = new FormData();
                    formData.set('chunkedFile', chunkedFile);
                    formData.set('orderIndex', orderIndex);
                    return axios({
                        method: 'post',
                        url: '/blog/saveChunkBlog',
                        config: { headers: { 'Content-Type': 'multipart/form-data' } },
                        data: formData
                    });
                }

                sendFileByChunk(file, _CHUNK_SIZE, cb)
                    .then(function () {
                        axios
                            .post('/blog/finalizeChunckFile', {
                                fileName: `${file.name}`,
                                finalize: true
                            })
                            .then((res) => {
                                resolve();
                            });
                    });

                return;
            }
        });
    }

    componentDidMount() {
        const { match } = this.props;
        axios
            .post(match.path)
            .then((res) => {
                const { err, mds } = res.data;
                if (err) {
                    console.log(err.message); // to handle
                } else {
                    this.setState({ mdDescription: mds });
                };
            })
            .catch((err) => {
                console.err('something is going wrong!!');
                console.log(err);
            })
    }


    render() {
        const { mdDescription } = this.state;
        return (
            <React.Fragment>
                <div className="filepond-wrapper">
                    <Upload.Filepond
                        exeUpload={this.handleUploadFilepond} />
                </div>
                <MarkdownRender source={mdDescription} />
                <DemoCodeRender source={md_democode} title="设置最多上传数量以及上传方法">
                    <div style={{ margin: '20px' }}>
                        <Upload maxAmount={5}
                            exeUpload={this.handleUpload} />
                    </div>
                </DemoCodeRender>
            </React.Fragment>
        );
    }
}

export default UploadDemo;