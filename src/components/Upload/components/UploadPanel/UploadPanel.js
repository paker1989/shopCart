import React from 'react';
// import PropTypes from 'prop-Types';

import './UploadPanel.scss';
import FileInput from '../FileInput';

class UploadPanel extends React.PureComponent {

  constructor(props) {
    super(props);
  }

  render() {
    const { prefix, 
            maxAmount,
            maxSize,
            type,
          } = this.props;

    return (
      <React.Fragment>
        <div className={`${prefix}-uploader-row`}>
          <div className="upload-label">本地资源:</div>
          <div className="upload-body upload-icon">
            <span>+</span>
            <FileInput />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default UploadPanel;