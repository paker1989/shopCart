import React from 'react';
import axios from 'axios';

import Upload from '../../../components/Upload';

class UploadDemo extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    /**
     * test only
     */
    handleUpload = ({ texts = [] }) => {
        if (texts.length === 0)
            return;

        const toPickData = texts[0];

        let data = {
            content: toPickData.data,
            fileName: toPickData.file.name
        };
        return new Promise((resolve, reject) => {
            axios
            .post('/blog/saveSimpleBlog', data)
            .then((res) => {
                setTimeout(() => {
                    resolve();
                }, 2000);
            });
        });
    }

    render() {
        return (
            <React.Fragment>
                <div style={{ margin: '20px' }}>
                    <Upload maxAmount={5} exeUpload={this.handleUpload} />
                </div>
                {/* <div style={{ margin: '20px' }}>
                    <Upload maxAmount={20} withoutModal={true} />
                </div> */}
            </React.Fragment>
        );
    }
}

export default UploadDemo;