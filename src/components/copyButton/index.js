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
  }

  render() {
    const {
      prefix,
      text,
      children
    } = this.props;

    const childToRender = children? Children.only(children)
      : (<button onClick={this.copy}>复制</button>);
    
    return (
      <div className={`${prefix}-copybutton-wrapper`}>
        {childToRender}
      </div>
    );
  }
}

export default CopyButton;