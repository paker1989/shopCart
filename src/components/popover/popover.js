import React, { Children } from 'react';
import ReactDOM from 'react-dom';
import propTypes from 'prop-types';

import Trigger from './trigger/trigger';
import Content from './content';
import Placement from './placement';
import kindOf from '../../utils/kindOf';


class Popover extends React.Component {

  static propTypes = {
    isVisible: propTypes.bool,
    onVisibleChange: propTypes.func,
    position: propTypes.func,
    cushion: propTypes.number,
    containerSelector: propTypes.string,
    className: propTypes.string, // trigger additional class
    wrapperClassName: propTypes.string, // popover additional class
    closeOnOutSide: propTypes.bool,
    onBeforeShow: propTypes.func,
    onBeforeClose: propTypes.func,
    onShow: propTypes.func,
  }

  static defaultProps = {
    cushion: 0,
    position: Placement.belowRight,
    containerSelector: 'body',
    closeOnOutSide: true
  }

  constructor(props) {
    super(props);
    if (!this.isPropVisibleControlled()) {
      this.state = {isVisible: false};
    }
  }

  isPropVisibleControlled() {
    return !!this.props.isVisible;
  }

  getVisible() {
    return this.isPropVisibleControlled()? this.props.isVisible
      : this.state.isVisible;
  }

  triggerRefChange = (triggerInstance) => {
     this.triggerNode = ReactDOM.findDOMNode(triggerInstance);
  }

  contentRefChange = (contentInstance) => {
    this.contentNode = ReactDOM.findDOMNode(contentInstance);
  }

  open = () => {
    this.setVisible(true);
  }

  close = () => {
    this.setVisible(false);
  }
  
  setVisible(isVisible) {
    const { onBeforeShow, onBeforeClose } = this.props,
          onBeforeHook = isVisible? onBeforeShow: onBeforeClose;

    const continuation = () => {
      this.pendingOnBeforeHook = false;
      if (this.isPropVisibleControlled()) {
        this.props.onVisibleChange();
      } else {
        this.setState({ isVisible });
      }
    }

    let maybePromise;
    if (onBeforeHook && !this.pendingOnBeforeHook) {
      this.pendingOnBeforeHook = true;
      maybePromise = onBeforeHook();
    }

    if (maybePromise && typeof maybePromise.then === 'function') {
      maybePromise.then(() => {
        continuation();
      })
    } else {
      continuation();
    }
  }

  getTriggerNode = () => {
    return this.triggerNode;
  }

  getContentNode = () => {
    return this.contentNode;
  }

  isClickOutSide = (evt) => {
    const { target } = evt,
          triggerNode = this.getTriggerNode(),
          contentNode = this.getContentNode();
  
    if (!triggerNode.contains(target) && !contentNode.contains(target)) {
      this.close();
    }
  }

  validChildren() {
    const { children } = this.props,
          childrenArray = Children.toArray(children);
    
    if (childrenArray.length !== 2) {
      throw new Error('you must have one trigger element and one content element');
    }

    const { trigger, content } = childrenArray.reduce((state, c) => {
      if (kindOf(c.type, Trigger)) {
        state.trigger = c;
      } else if (kindOf(c.type, Content)) {
        state.content = c;
      }
      return state;
    }, {trigger: null, content: null});

    if (!trigger) {
      throw new Error('you must have one and only one Trigger element');
    }
    if (!content) {
      throw new Error('you must have one and only one Content element');
    }
    return { trigger, content };
  }

  render() {
    const {
      containerSelector,
      cushion,
      position,
      className,
      wrapperClassName,
    } = this.props;
    const visible = this.getVisible();
    const { trigger, content } = this.validChildren();
    return (
      <div className={wrapperClassName}>
        {React.cloneElement(trigger, {
          open: this.open,
          close: this.close,
          triggerRefChange: this.triggerRefChange,
          contentVisible: visible,
          isClickOutSide: this.isClickOutSide
        })}
        {React.cloneElement(content, {
          open: this.open,
          getTriggerNode: this.getTriggerNode,
          contentRefChange: this.contentRefChange,
          getContentNode: this.getContentNode,
          containerSelector,
          placement: position,
          visible,
          cushion,
          className,
        })}
      </div>
    );
  }
}

export default Popover;