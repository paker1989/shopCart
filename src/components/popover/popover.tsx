import * as React from 'react';
import { Children } from 'react';
import * as ReactDOM from 'react-dom';
import isFunction from 'lodash/isFunction';

import Trigger from './trigger/trigger';
import Content from './content';
import Placement from './placement';
import kindOf from '../../utils/kindOf';

export interface IPopoverProps {
  isVisible?: boolean;
  onVisibleChange?: (isVisible: boolean) => void,
  position?: (...options) => any;
  cushion?: number;
  containerSelector?: string;
  className?: string; // trigger additional class
  wrapperClassName?: string; // popover additional class
  closeOnOutSide?: boolean;
  onBeforeShow?: () => void;
  onBeforeClose?: () => void;
  onShow?: () => void;
}

export interface IPopoverState {
  isVisible?: boolean;
}

class Popover extends React.Component<IPopoverProps, IPopoverState> {
  triggerNode: any;
  contentNode: any;
  pendingOnBeforeHook: boolean;

  static Trigger?: any;
  static Content?: any;
  static Placement?: any;

  static defaultProps = {
    cushion: 0,
    position: Placement.belowRight,
    containerSelector: 'body',
    closeOnOutSide: true
  }

  constructor(props) {
    super(props);
    if (!this.isPropVisibleControlled()) {
      this.state = { isVisible: false };
    }
  }

  isPropVisibleControlled() {
    return this.props.isVisible !== undefined && isFunction(this.props.onVisibleChange);
  }

  getVisible() {
    return this.isPropVisibleControlled() ? this.props.isVisible
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
      onBeforeHook = isVisible ? onBeforeShow : onBeforeClose;

    const continuation = () => {
      this.pendingOnBeforeHook = false;
      if (this.isPropVisibleControlled()) {
        this.props.onVisibleChange(isVisible);
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

    const { trigger, content } = childrenArray.reduce<{
      trigger: any;
      content: any;
    }>((state, c: React.ReactElement<any>) => {
      if (kindOf(c.type, Trigger)) {
        state.trigger = c;
      } else if (kindOf(c.type, Content)) {
        state.content = c;
      }
      return state;
    }, { trigger: null, content: null });

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