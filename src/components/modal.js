import React from 'react';
import propTypes from 'prop-types';
import ReactDOM from 'react-dom';

class Modal extends React.Component {
  componentDidMount() {
    console.log('mont');
    const { isFullScreen } = this.props;

    // this.underLayer = document.createElement('div');
    // this.underLayer.appendChild(this);
    // if (isFullScreen) {
    //   document.body.appendChild(this.underLayer);
    // }
    if (this.node) {
      document.body.appendChild(this.node);
    }
  }

  componentWillUnmount() {
    console.log('unmount');
    document.body.removeChild(this.node);
  }

  static defaultLayerStyles = {
    position: 'fixed',
    width: '100%',
    height: '100%',
    top: '0',
    left: '0',
    background: 'grey'
  }

  static defaultContentStyles = {
    position: 'absolute',
    zIndex: '999',
  }

  render() {  
    this.node = document.createElement('div');

    const { contentStyle, layerStyle, contentClass, layerClass } = this.props;
    const modalLayerProps = {
      style: Modal.defaultLayerStyles,
    };
    const modalContentProps = {
      style: Modal.defaultContentStyles,
    }

    if (contentStyle) {
      modalContentProps.style = Object.assign(modalContentProps.style, contentStyle);
    }

    if (layerStyle) {
      modalLayerProps.style = Object.assign(modalLayerProps.style, layerStyle);
    }

    if (contentClass) {
      modalContentProps.className = contentClass;
    }

    if (layerClass) {
      modalLayerProps.className = layerClass;
    }

    modalLayerProps.className += ' modal-layer';

    // console.log(modalContentProps)

    const { children } = this.props;

    console.log(children)

    const modalLayer = React.createElement('div',
      modalLayerProps,
      React.createElement('div',
        modalContentProps,
        children
      )
    )

    return ReactDOM.createPortal(modalLayer, this.node);
  }
}

 

Modal.defaultProps = {
  fullScreen: true,
}



Modal.prototypes = {
  
}

export default Modal;