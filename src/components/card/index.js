import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';

import './card.scss';

class Card extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    prefix: PropTypes.string,
    title: PropTypes.node,
    action: PropTypes.node,
    loading: PropTypes.bool,
    type: PropTypes.oneOf(['normal', 'nested']),
    style: PropTypes.object,
    bodyStyle: PropTypes.object,
  }

  static defaultProps = {
    prefix: 'bxu',
    type: 'normal',
    loading: false,
    style: {},
    bodyStyle: {}
  }

  render() {
    const {
      prefix,
      type,
      title,
      loading,
      children,
      style,
      bodyStyle,
      className,
      action
    } = this.props;

    const wrapperClass = cx({
      [`${prefix}-card-container`]: true,
      [`${prefix}-card-container_${type}`]: true,
    }, className);

    let content;

    if (loading) {
      content = (<div className={`${prefix}-card-content_loading`}>Loading...</div>);
    } else {
      content = (
        <div className={`${prefix}-card-content_body`}>
          {children}
        </div>
      )
    }

    return (
      <div className={wrapperClass} style={style}>
        {(title || action) && (
          <div className={`${prefix}-card-header`}>
            { title && (
              <div className={`${prefix}-card-header_title`}>{title}</div>
            )}
            { action && (
              <div className={`${prefix}-card-header_action`}>{action}</div>
            )}
          </div>
        )}
        <div className={`${prefix}-card-content`} style={bodyStyle}>
          {content}
        </div>
      </div>
    );
  }
}

export default Card;