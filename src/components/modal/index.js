import React from 'react';
import propTypes from 'prop-types';
import ReactDOM from 'react-dom';

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      beforeOpen: true,
      afterOpen: false,
      afterClose: false,
    })
  }

  componentDidMount() {
    const { closeAfterTimeMS } = this.props;
    if (closeAfterTimeMS) {
      this.timeID = setTimeout(() => {
        this.removeModal(); 
      }, closeAfterTimeMS);
    }
    if (this.node) {
      document.body.appendChild(this.node);
    }
    // this.setState((state) => ({
    //   beforeOpen: false,
    //   afterOpen: true
    // }));
  }

  componentWillUnmount() {
    document.body.removeChild(this.node);
  }

  removeModal = () => {
    if (this.timeID) {
      this.timeID = null;
    }
    const { onClose } = this.props;
    if (typeof onClose === 'function') {
      this.props.onClose();
    } else {
      document.body.removeChild(this.node);
    }
  }

  static defaultLayerStyles = {
    position: 'fixed',
    width: '100%',
    height: '100%',
    top: '0',
    left: '0',
    background: 'rgba(55,55,55,.6)'
  }

  static defaultContentStyles = {
    position: 'absolute',
    zIndex: '999',
    minWidth: '400px',
    minHeight: '200px'
  }

  render() {  
    const modalLayerProps = {
      style: Modal.defaultLayerStyles,
    };
    const modalContentProps = {
      style: Modal.defaultContentStyles,
    }
    const { contentStyle, layerStyle, contentClass, layerClass, children } = this.props;

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

    this.node = document.createElement('div');

    const modalLayer = (
      <div className={modalLayerProps.className} style={modalLayerProps.style}>
        <div className={modalContentProps.className} style={modalContentProps.style}>
          {children}
        </div>
      </div>
    );

    return ReactDOM.createPortal(modalLayer, this.node);
  }
}

Modal.defaultProps = {
  isClose: false,
  closeAfterTimeMS: false,
}

export default Modal;