import React, { Children } from 'react';
import PropTypes from 'prop-types';

import deselectRangeFn from './deselectRange';
import Notify from '../notify';
import isFunction from 'lodash/isFunction';

class CopyButton extends React.PureComponent {
  static propTypes = {
    text: PropTypes.string,
    onCopySuccess: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
    onCopyError: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  }

  static defaultProps = {
    prefix: 'bxu',
    onCopySuccess: '复制成功',
    onCopyError: '复制失败',
  }

  constructor(props) {
    super(props);
  }

  onCopy = () => {
    const { onCopyError, onCopySuccess } = this.props;
    let success,
        copyCallback;

    success = this.copy();
    copyCallback = success? onCopySuccess : onCopyError;

    if (isFunction(copyCallback)) {
      copyCallback();
    } else {
      if (success) {
        Notify.success(onCopySuccess);
      } else {
        Notify.error(onCopyError);
      }
    }
    
  }
  /**
   * handle copy action
   */
  copy() {
    const { text } = this.props;
    let restoreRangeFn = deselectRangeFn(); // deselect the current range

    let range,
        selection,
        mark,
        success = false;

    try {
      range = document.createRange();
      selection = document.getSelection();
  
      mark = document.createElement('span');
      mark.textContent = text;
      mark.style = {
        userSelect: 'text',
        webUserSelect: 'text',
        msUserSelect: 'text',
        MozUserSelect: 'text',
        position: 'fixed',
        top: 0,
        clip: 'rect(0,0,0,0)',
        whiteSpace: 'pre',
        all: 'unset',
      }
  
      document.body.append(mark);
      range.selectNodeContents(mark);
      selection.addRange(range);
  
      const sucessful = document.execCommand('copy');
      if (!sucessful) {
        throw new Error('copy command was unsuccessful');
      }
      success = true;
    } catch(e) {
      try {
        window.clipboardData.setData('text', text);
        success = true;
      } catch(e) {
        console.log(e); 
      }
    } finally {
      if (selection) {
        if (typeof selection.removeRange === 'function') {
          selection.removeRange(range);
        } else {
          selection.removeAllRanges();
        }
      }
    }
    
    if (mark) {
      document.body.removeChild(mark);
    }
    restoreRangeFn();
    return success;
  }

  render() {
    const {
      className,
      children
    } = this.props;
    // let ownClass,
    // wrapperClass;

    const childToRender = children? Children.only(children)
    : (<button className={className}>复制</button>);

    // ownClass = childToRender.props.className;
    // wrapperClass = cx(ownClass, className);
    
    return  React.cloneElement(childToRender, {
      onClick: this.onCopy,
      // className: wrapperClass,
    })
  }
}

export default CopyButton;