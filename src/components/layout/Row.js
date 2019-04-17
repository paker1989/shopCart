import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import cx from 'classnames';

class Row extends PureComponent {

  static propTypes = {
    prefix: PropTypes.string,
  }

  static defaultProps = {
    prefix: 'bxu'
  }

  render() {
    const { prefix, className, children, ...others } = this.props,
          classNames = cx({
            [`${prefix}-row`]: true,
            [className]: className,
          });

    return (
      <div className={classNames} {...others}>
        {children}
      </div>
    );
  }
}

export default Row;