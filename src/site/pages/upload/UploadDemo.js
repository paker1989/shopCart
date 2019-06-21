import React from 'react';
import axios from 'axios';

import Upload from '../../../components/Upload';

class UploadDemo extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    handleUpload = ({ images = [], files = [] }) => {
        return axios
            .post('/blog/saveBlog', {
                data: files[0]
            })
            .then((res) => {
                console.log(res);
            });
    }

    render() {
        return (
            <React.Fragment>
                <div style={{ margin: '20px' }}>
                    <Upload maxAmount={2} exeUpload={this.handleUpload} />
                </div>
                <div style={{ margin: '20px' }}>
                    <Upload maxAmount={20} withoutModal={true} />
                </div>
            </React.Fragment>
        );
    }
}

export default UploadDemo;