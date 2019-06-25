import React from 'react';
import axios from 'axios';

import MarkdownRender from '../../utils/MarkdownRender';
import DemoCodeRender from '../../utils/DemoCodeRender/DemoCodeRender';

import Upload from '../../../components/fileUpload';
import { _CHUNK_SIZE } from '../../../components/fileUpload/utils/util';
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
    handleUpload = ({ texts = [] }) => {
        if (texts.length === 0)
            return;

        // const toPickData = texts[0];
        const { data, file, fk } = texts[0];

        const toSend = {
            content: data,
            fileName: file.name
        };

        return new Promise((resolve, reject) => {
            if (file.size > _CHUNK_SIZE) {
                console.error(`file size ${file.size} is over small file size's limit.`);

                const cb = function (data, orderIndex) {
                    axios
                        .post('/blog/saveChunkBlog', {
                            fileName: `${file.name}_${orderIndex}`,
                            data,
                            orderIndex
                        });
                }

                sendFileByChunk(file, _CHUNK_SIZE, cb)
                    .then(function () {
                        axios
                            .post('/blog/saveChunkBlog', {
                                fileName: `${file.name}`,
                                finalize: true
                            })
                            .then((res) => {
                                setTimeout(() => {
                                    resolve();
                                }, 2000);
                            });;
                    });

                return;
            }

            axios
                .post('/blog/saveSimpleBlog', toSend)
                .then((res) => {
                    setTimeout(() => {
                        resolve();
                    }, 2000);
                });
        });
    }

    componentDidMount() {
        const { match } = this.props;
        // console.log(match.path);
        axios
            .post(match.path)
            .then((res) => {
                console.log(res);
                const { err, mds } = res.data;
                if (err) {
                    console.log(err.message); // to handle
                } else {
                    this.setState({ mdDescription: mds });
                };
            })
            .catch((err) => {
                console.log('something is going wrong!!');
                console.log(err);
            })
    }


    render() {
        // return (
        //     <React.Fragment>
        //         <div style={{ margin: '20px' }}>
        //             <Upload maxAmount={5} exeUpload={this.handleUpload} />
        //         </div>
        //         <div style={{ margin: '20px' }}>
        //             <Upload maxAmount={20} withoutModal={true} />
        //         </div>
        //     </React.Fragment>
        // );
        const { mdDescription } = this.state;
        return (
            <React.Fragment>
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