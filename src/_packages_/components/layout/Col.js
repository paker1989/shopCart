import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import cx from 'classnames';

class Col extends PureComponent {

  static propTypes = {
    prefix: PropTypes.string,
    span: PropTypes.number.isRequired,
    offset: PropTypes.number
  }

  static defaultProps = {
    prefix: 'bxu'
  }

  render() {
    const { prefix, className, span, offset, children, ...others } = this.props,
          classNames = cx({
            [`${prefix}-col`]: true,
            [className]: className,
            [`${prefix}-col-${span}`]: span,
            [`${prefix}-col-offset-${offset}`]: offset,
          });

    return (
      <div className={classNames} {...others}>
        {children}
      </div>
    );
  }
}

export default Col;