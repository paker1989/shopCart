import React from 'react';
import PropTypes from 'prop-types';
import toArray from 'lodash/toArray';
import isArray from 'lodash/isArray';
import isFunction from 'lodash/isFunction';

import Notify from '../../../notify';
import { DEFAULT_ACCEPT, getAcceptFromArray, isValidFileType, isImage, UID_KEY } from '../../utils/accept';
import './FileInput.scss';

class FileInput extends React.PureComponent {

  constructor(props) {
    super(props);
  }

  processFiles = (evt) => {
    console.log('process files');

    if (!evt.target.files || evt.target.files.length === 0)
      return;

    const { maxAmount } = this.props;
    const files = evt.target.files;
    let filesArray = toArray(files);

    evt.target.value = null;

    if (maxAmount && maxAmount < filesArray.length) {
      Notify.error(`文件数量超出限制，最大文件数量为${maxAmount}`, 2000);
      return;
    }

    const images = filesArray.filter(file => isImage(file.type));
    const texts = filesArray.filter(file => isImage(file.type) === false);

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
            fk: `${UID_KEY}_${lastImageIndex + index}`
          });
        } else {
          localFiles.push({
            data: e.target.result,
            file,
            fk: `${UID_KEY}_${lastFileIndex + index}`
          });
        }
        onChange(localFiles);
      };

      if (isImageType) {
        fileReader.readAsDataURL(file);
      } else {
        console.log(file.size);
        if (file.size > 1024 * 1024 * 1024) {
          fileReader.readAsArrayBuffer(file.slice(0, 1024 * 1024));
          console.log('read as array buffer');
        } else {
          fileReader.readAsText(file);
        }
      }
    } else {
      Notify.error('请在Upload组件上添加onChange函数');
    }
  }

  render() {
    const { type, maxAmount } = this.props;
    const accept = isArray(type) ? getAcceptFromArray(type) : DEFAULT_ACCEPT[type];

    return (
      <input
        className="upload-input"
        type="file"
        accept={accept}
        multiple={maxAmount !== 0}
        onChange={this.processFiles} />
    );
  }
}

export default FileInput;