import React from 'react';
import toArray from 'lodash/toArray';
import isArray from 'lodash/isArray';
import isFunction from 'lodash/isFunction';

import Notify from '../../../notify';

import {
  DEFAULT_ACCEPT,
  getAcceptFromArray,
  isValidFileType,
  isImage,
  _GB_LIMIT,
  _BODY_DATA_LIMIT,
  _CHUNK_SIZE,
  UID_KEY,
  _MB_LIMIT
} from '../../utils/util';
import './FileInput.scss';

class FileInput extends React.PureComponent {

  constructor(props) {
    super(props);
    
    const { type } = this.props;
    this.state = ({
      accept: isArray(type) ? getAcceptFromArray(type) : DEFAULT_ACCEPT[type]
    });
  }

  processFiles = (evt) => {
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
        // const mimeType = fileType(
        //   base64ToArrayBuffer(
        //     e.target.result.replace(/^(.*?)base64,/, '')
        //   )
        // );

        // if (
        //   accept &&
        //   (!mimeType ||
        //     mimeType.mime.match(new RegExp(accept.replace(/, ?/g, '|'))))
        // ) {
        //   console.log(mimeType);
        // }
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
        if (file.size >= _BODY_DATA_LIMIT) {
          fileReader.readAsArrayBuffer(file.slice(0, _MB_LIMIT));
        } else {
          fileReader.readAsText(file);
        }
      }
    } else {
      Notify.error('请在Upload组件上添加onChange函数');
    }
  }

  render() {
    const { maxAmount } = this.props;
    const { accept } = this.state;

    return (
      <input
        className="upload-input"
        type="file"
        accept={accept}
        multiple={maxAmount !== 1}
        onChange={this.processFiles} />
    );
  }
}

export default FileInput;