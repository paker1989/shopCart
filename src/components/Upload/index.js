import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import Modal from '../modal';
import UploadPanel from './UploadPanel';
import FileInput from './FileInput';

class Upload extends React.Component {
  static propTypes = {
    prefix: PropTypes.string,
    withoutModal: PropTypes.bool, // 直接渲染，不通过popup
    localOnly: PropTypes.bool,
    maxSize: PropTypes.number,
    maxAmount: PropTypes.number,
    tips: PropTypes.string,
  }

  static defaultProps = {
    prefix: 'bxu',
    withoutModal: false,
    localOnly: false
  }

  constructor(props) {
    super(props);
    this.state = {
      showUpload: false
    };
  }

  showUpload = () => {
    this.setState({
      showUpload: true
    });
  }

  render() {
    const {
      prefix,
      className,
      maxAmount,
      maxSize,
      withoutModal,
      tips,
      children
    } = this.props;

    const { showUpload } = this.state;

    const wrapperClass = cx({
      [`${prefix}-upload-wrapper`]: true,
    }, className);

    return (
      <div className={wrapperClass}>
        {withoutModal ? (
          <UploadPanel
            maxAmount={maxAmount}
            maxSize={maxSize}
          />
        ) : (
          <div className={`${prefix}-upload-modal-container`}>
            {/* to add previews of uploaded files */}
            <span 
              className={`${prefix}-upload-trigger`}
              onClick={this.showUpload}>
              {children || <span>+</span>}
              <FileInput /> 
            </span>  {/* upload panel trigger */}
            <p className={`${prefix}-upload-tips`}>{tips}</p>
            {showUpload && (
              <Modal>
                <UploadPanel />
              </Modal>
            )}
          </div>
        )}
      </div>
    );
  }
}

Upload.FileInput = FileInput;

export default Upload;