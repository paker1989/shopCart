import React from 'react';
import PropTypes from 'prop-types';

import cx from 'classnames';

class Affix extends React.PureComponent {

  static propTypes = {
    offsetTop: PropTypes.number,
    offsetBottom: PropTypes.number,
    onPin: PropTypes.func,
    onUnpin: PropTypes.func,
    zIndex: PropTypes.number,
    className: PropTypes.string,
    placeHoldClassName: PropTypes.string,
    prefix: PropTypes.string
  }

  static defaultProps = {
    prefix: 'bxu',
  }

  render() {
    const {
      className,
      prefix,
      children
    } = this.props;

    return (
      <div className={}>
      
      </div>
    );
  }
}

export default Affix;