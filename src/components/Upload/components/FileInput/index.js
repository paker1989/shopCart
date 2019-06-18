import React from 'react';
import PropTypes from 'prop-types';
import toArray from 'lodash/toArray';
import isArray from 'lodash/isArray';
import isFunction from 'lodash/isFunction';

import Notify from '../../../notify';
import { DEFAULT_ACCEPT, getAcceptFromArray, isValidFileType, isImage } from '../../utils/accept';
import './FileInput.scss';

class FileInput extends React.PureComponent {

  constructor(props) {
    super(props);
  }

  processFiles = (evt) => {
    // console.log(evt.target.files);
    if (!evt.target.files || evt.target.files.length === 0)
      return;

    const { maxAmount, maxSize } = this.props;

    let files = toArray(evt.target.files);
    if (maxAmount && maxAmount < files.length) {
      Notify.error(`文件数量超出限制，最大文件数量为${maxAmount}`, 2000);
      return;
    }

    const images = files.filter(file => isImage(file.type));
    const texts = files.filter(file => isImage(file.type) === false);
    
    this.iterator(images);
    this.iterator(texts);
  }

  iterator = (array) => {
    const { maxSize } = this.props;

    array.forEach((file, index) => {
      if (!maxSize || file.size <= maxSize) {
        this.addFile(file, index);
      } else {
        Notify.error(`文件 ${file.name} 大小超过限制 (${maxSize} bytes)`, 2000);
      }
    });
  }

  addFile = (file, index) => {
    const { onChange, lastImageIndex, lastFileIndex } = this.props;
    const localFiles = []; 

    if (isValidFileType(file) && isFunction(onChange)) {
      let isImageType = isImage(file.type); 
      let fileReader = new FileReader();
      fileReader.onload = e => {
        if (isImageType) {
          localFiles.push({
            src: e.target.result,
            file,
            fk: lastImageIndex + index
          });
        } else {
          localFiles.push({
            data: e.target.result,
            file,
            fk: lastFileIndex + index
          });          
        }
        onChange(localFiles);
      };

      if (isImageType) {
        fileReader.readAsDataURL(file);
      } else {
        fileReader.readAsArrayBuffer(file);
      }
    } else {
      Notify.error('请在Upload组件上添加onChange函数');
    }
  }

  render() {
    const { type, maxSize, maxAmount, onChange } = this.props;
    const accept = isArray(type) ? getAcceptFromArray(type) : DEFAULT_ACCEPT[type];

    return (
      <input
        className="upload-input"
        type="file"
        accept={accept}
        multiple={maxAmount !== 0}
        onChange={this.processFiles}/>
    );
  }
}

export default FileInput;