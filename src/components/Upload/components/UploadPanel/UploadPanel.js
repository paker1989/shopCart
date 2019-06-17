import React from 'react';
// import PropTypes from 'prop-Types';

import './UploadPanel.scss';
import FileInput from '../FileInput';
import { checkTypeIncludes } from '../../utils/accept'

class UploadPanel extends React.PureComponent {

  constructor(props) {
    super(props);
  }

  render() {
    const { prefix, 
            maxAmount,
            maxSize,
            type,
            localOnly
          } = this.props;
    
    // show it when localOnly is false and type contains image
    const isShowNetwork = !localOnly && checkTypeIncludes(type, 'image');

    return (
      <React.Fragment>
        {isShowNetwork && (
        <div className={`${prefix}-uploader-row`}>
          <div className="upload-label">网络图片:</div>
          <div className="upload-body upload-network-image-wraper">
            <input 
              type="text"
              placeholder="请添加网络图片地址"/>
            <button>提取</button>
          </div>
        </div>
        )}
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