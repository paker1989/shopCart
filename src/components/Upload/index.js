import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import Modal from '../modal';
import UploadPanel from './components/UploadPanel/UploadPanel';
import FileInput from './components/FileInput';

import './Upload.scss';

class Upload extends React.Component {
  static propTypes = {
    prefix: PropTypes.string,
    withoutModal: PropTypes.bool, // 直接渲染，不通过popup
    localOnly: PropTypes.bool,
    maxSize: PropTypes.number,
    maxAmount: PropTypes.number,
    tips: PropTypes.string,   
    type: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
    multiple: PropTypes.bool,
  }

  static defaultProps = {
    prefix: 'bxu',
    withoutModal: false,
    localOnly: false,
    type: ['image', 'text'],
    multiple: false
  }

  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
  }

  showUpload = () => {
    // console.log('show upload');
    this.setState({
      visible: true
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
      type,
      localOnly,
      children
    } = this.props;

    const { visible } = this.state;

    const wrapperClass = cx({
      [`${prefix}-upload-wrapper`]: true,
    }, className);

    return (
      <div className={wrapperClass}>
        {withoutModal ? (
          <UploadPanel
            type={type}
            prefix={prefix}
            maxAmount={maxAmount}
            maxSize={maxSize}
            localOnly={localOnly}
          />
        ) : (
          <div className={`${prefix}-upload-modal-container`}>
            {/* to add previews of uploaded files */}
            <span 
              className={`${prefix}-upload-trigger-container`}
              onClick={this.showUpload}>
              {children || <span className={`${prefix}-upload-default-trigger`}>+</span>}
            </span>  {/* upload panel trigger */}
            <p className={`${prefix}-upload-tips`}>{tips}</p>
            {visible && (
              <Modal
                contentClass={`${prefix}-uploadpanel-layer`}
                onClose={() => { this.setState({ visible: false })}}>
                <UploadPanel
                  type={type}
                  prefix={prefix}
                  maxAmount={maxAmount}
                  maxSize={maxSize}
                  localOnly={localOnly}/>
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