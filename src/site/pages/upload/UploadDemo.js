import React from 'react';

import Upload from '../../../components/Upload';

class UploadDemo extends React.PureComponent {
    constructor(props) {
        super(props);
    }
 
    render() {
        return (
            <React.Fragment>
                <div style={{ margin: '20px' }}>
                    <Upload maxAmount={2} />
                </div>
                <div style={{ margin: '20px' }}>
                    <Upload maxAmount={20} withoutModal={true} />
                </div>
            </React.Fragment>
        );
    }
}

export default UploadDemo;