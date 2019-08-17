import React from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

import { CSSTransition } from 'react-transition-group';
import cx from 'classnames';

import './notify.scss';

class NotifyContent extends React.PureComponent {

  static propTypes = {
    type: PropTypes.string,
    content: PropTypes.string,
    prefix: PropTypes.string,
    containerNode: PropTypes.object,
    isIn: PropTypes.bool,
    closeCallback: PropTypes.func
  }

  static defaultProps = {
    type: 'success',
    prefix: 'bxu',
  }

  onClose = () => {
    const { closeCallback } = this.props;
    if (closeCallback) {
      closeCallback();
    }
  }

  render() {
    const {
      prefix,
      type,
      content,
      containerNode,
      isIn
    } = this.props;

    const notifyWrapper = cx({
      [`${prefix}-notify-wrapper`]: true,
      [`${prefix}-notify-${type}`]: type,
    });

    return createPortal(
      <CSSTransition
        timeout={800}
        in={isIn}
        appear
        classNames="notify"
        onExited={this.onClose}
        unmountOnExit>
        <div className={notifyWrapper}>
          {content}
        </div>
      </CSSTransition>
    , containerNode);
  }
}

export default NotifyContent;