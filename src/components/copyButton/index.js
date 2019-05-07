import React, { Children } from 'react';
import PropTypes from 'prop-types';

import deselectRangeFn from './deselectRange';

class CopyButton extends React.PureComponent {
  static propTypes = {
    prefix: PropTypes.string,
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

  /**
   * handle copy action
   */
  copy = () => {
    const { text } = this.props;
    let restoreRangeFn = deselectRangeFn(); // deselect the current range

    let range,
        selection,
        mark;

    try {
      range = document.createRange();
      selection = document.getSelection();
  
      mark = document.createElement('span');
      mark.textContent = text;
      // mark.style.
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
    } catch(e) {
      try {
        window.clipboardData.setData('text', text);
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
  }

  render() {
    const {
      prefix,
      text,
      className,
      children
    } = this.props;

    const childToRender = children? Children.only(children)
      : (<button className="bxu-btn bxu-success">复制</button>);
    
    return  React.cloneElement(childToRender, {
      onClick: this.copy
    })
  }
}

export default CopyButton;