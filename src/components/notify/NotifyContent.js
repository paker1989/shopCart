import React from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

import cx from 'classnames';

class NotifyContent extends React.PureComponent {

  static propTypes = {
    type: PropTypes.string,
    closeCallback: PropTypes.func,
    content: PropTypes.string,
    prefix: PropTypes.string,
  }

  static defaultProps = {
    type: 'success',
    prefix: 'bxu',
  }

  render() {
    console.log('render');
    const {
      prefix,
      type,
      content
    } = this.props;

    const notifyWrapper = cx({
      [`${prefix}-notify-wrapper`]: true,
      [`${prefix}-notify-${type}`]: type,
    });

    let containerNode = document.querySelector('.bxu-notify-container');
    if (!containerNode) {
      containerNode = document.createElement('div');
      containerNode.className = 'bxu-notify-container';
      document.body.appendChild(containerNode);
    }

    console.log(containerNode);

    return createPortal(
      <div className={notifyWrapper}>
        {content}
      </div>
    , containerNode);
  }
}

export default NotifyContent;