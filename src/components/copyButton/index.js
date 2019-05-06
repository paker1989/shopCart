import React, { Children } from 'react';
import PropTypes from 'prop-types';

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
    // TODO
    console.log('just copy it');
  }

  render() {
    const {
      prefix,
      text,
      children
    } = this.props;

    const childToRender = children? Children.only(children)
      : (<button>复制</button>);
    
    return  React.cloneElement(childToRender, {
      onClick: this.copy
    })
  }
}

export default CopyButton;