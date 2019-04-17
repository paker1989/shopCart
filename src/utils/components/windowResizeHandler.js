import WindowEventHandler from './windowEventHandler';
import getViewportSize from '../getViewportSize';

import React from "react";
import PropTypes from 'prop-types';

class WindowResizeHandler extends React.PureComponent {
  
  static proptypes = {
    onResize: PropTypes.func.isRequired,
    useCapture: Proptypes.func
  }

  onResize = (evt) => {
    const { onResize } = this.props;
    const viewportSize = getViewportSize();

    const delta = {
      x: viewportSize.width - this._previousViewportSize.width,
      y: viewportSize.height - this._previousViewportSize.height,
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
     
    return <WindowEventHandler eventName="resize" callbackFn={this.onResize} userCapture={useCapture}/>
  }
}

export default WindowResizeHandler;