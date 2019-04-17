import React from "react";
import PropTypes from 'prop-types';

class WindowEventHandler extends React.PureComponent {

  static proptypes = {
    eventName: PropTypes.string.isRequired,
    callbackFn: PropTypes.func.isRequired,
    useCapture: Proptypes.func
  }

  static defaultProps = {
    useCapture: false
  }

  componentDidMount() {
    const { eventName, callbackFn, useCapture } = this.props;
    window.addEventListener(eventName, callbackFn, useCapture)
  }

  componentWillUnmount() {
    const { eventName, callbackFn, useCapture } = this.props;
    window.removeEventListener(eventName, callbackFn, useCapture);
  }

  render() {
    return null;
  }
}

export default WindowEventHandler;