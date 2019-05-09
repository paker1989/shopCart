import React from "react";
import PropTypes from 'prop-types';

import WindowEventHandler from './windowEventHandler';
import getViewportSize from '../getViewportSize';

class WindowResizeHandler extends React.PureComponent {
  
  static proptypes = {
    onResize: PropTypes.func.isRequired,
    useCapture: PropTypes.bool
  }

  onResize = (evt) => {
    const { onResize } = this.props;
    const viewportSize = getViewportSize();

    const delta = {
      deltaX: viewportSize.width - this._previousViewportSize.width,
      deltaY: viewportSize.height - this._previousViewportSize.height,
    };

    if (delta.deltaX === 0 && delta.deltaY === 0) {
      return;
    }

    onResize(evt, delta);
    this._previousViewportSize = viewportSize;
  }

  componentDidMount() {
    this._previousViewportSize = getViewportSize();
  }

  render() {
    const { useCapture } = this.props;
    return <WindowEventHandler eventName="resize" callbackFn={this.onResize} userCapture={useCapture}/>
  }
}

export default WindowResizeHandler;