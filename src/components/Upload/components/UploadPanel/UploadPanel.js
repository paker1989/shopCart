import React from 'react';
import cx from 'classnames';

import './UploadPanel.scss';
import FileInput from '../FileInput';
import { checkTypeIncludes, isImage } from '../../utils/accept'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class UploadPanel extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      localImages: [],
      localTexts: [],
    }
  }

  handleFileChange = (files) => {
    let { localImages, localTexts } = this.state;
    if (!files)
      return;

    files.forEach((item) => {
      console.log(item.file.type);
      if (isImage(item.file.type)) {
        localImages.splice(localImages.length, 0, item);
        console.log(localImages);
        this.setState({ localImages });
      } else {
        localTexts.push(item);
        this.setState({ localTexts });
      }
    })
  }

  render() {
    const { prefix, 
            maxAmount,
            maxSize,
            type,
            localOnly,
            onClose,
          } = this.props;
    
    const { localImages, localTexts } = this.state;
    console.log(localImages);
    console.log('============');
    console.log(localTexts);
          
    // show it when localOnly is false and type contains image
    const isShowNetwork = !localOnly && checkTypeIncludes(type, 'image');
    const isConfirmValid = true;
    const confirmButtonClass = cx({
      [`${prefix}-confirm`]: true,
      ['is-valid']: isConfirmValid
    });

    return (
      <React.Fragment>
        <div className={`${prefix}-uploader-head-container`}>
          <span className="head-title">资源选择</span>
          <span className="head-close-button"
                onClick={onClose}>×</span>
        </div>
        <div className={`${prefix}-uploader-content-container`}>
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
            <div className="upload-body">
              <div className="upload-icon">
                <span>+</span>
                <FileInput
                  lastImageIndex={localImages.length}
                  lastFileIndex={localTexts.length}
                  type={type}
                  maxAmount={maxAmount}
                  maxSize={maxSize}
                  onChange={this.handleFileChange}/>
              </div>
              {localImages.length > 0 && (
                <ul className="local-images-list">
                  {localImages.map(image => (
                    <li>
                      <div className="loal-image-wrapper" key={image.fk}>
                        <img src={image.src} alt={image.file.name}/>
                        <span><FontAwesomeIcon icon="times-circle"/></span>
                      </div>
                    </li>
                  ))}
                </ul>

              )}
            </div>
          </div>
          <div className={`${prefix}-uploader-row`}>
            <div className="upload-label">placeholder</div>
            <div className="upload-body">upload body</div>
            <div>{}</div>
          </div>
        </div>
        <div className={`${prefix}-uploader-confirm-container`}>
          <button className={confirmButtonClass}>确 认</button>
        </div>
      </React.Fragment>
    );
  }
}

export default UploadPanel;