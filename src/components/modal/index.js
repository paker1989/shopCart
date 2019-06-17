import React from 'react';
import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import "./modal.scss";

class Modal extends React.Component {

  static defaultProps = {
    isClose: false,
    closeAfterTimeMS: false,
    closeOnEsc: true,
  }

  constructor(props) {
    super(props);
    this.state = ({
      beforeOpen: true,
      afterOpen: false,
      afterClose: false,
    })
  }

  componentDidMount() {
    const { closeAfterTimeMS, closeOnEsc } = this.props;
    if (closeAfterTimeMS) {
      this.timeID = setTimeout(() => {
        this.removeModal(); 
      }, closeAfterTimeMS);
    }
    if (this.node) {
      document.body.appendChild(this.node);
    }

    if (closeOnEsc) { // handle esc event
      window.addEventListener('keyup', this.handleCloseOnEsc);
    }
  }

  componentWillUnmount() {
    const { closeOnEsc } = this.props;
    if (closeOnEsc) {
      window.removeEventListener('keyup', this.handleCloseOnEsc);
    }

    document.body.removeChild(this.node);
  }

  handleCloseOnEsc = (evt) => {
    if (evt.keyCode === 27) {
      this.removeModal();
    }
  }

  removeModal = () => {
    if (this.timeID) {
      this.timeID = null;
    }
    const { onClose } = this.props;
    if (typeof onClose === 'function') {
      this.props.onClose();
    } else {
      console.log('remove modal');
      // ReactDOM.unmountComponentAtNode(ReactDOM.findDOMNode(this));
      document.body.removeChild(this.node);
    }
  }

  static defaultLayerStyles = {
    position: 'fixed',
    overflow: 'auto',
    top: '0',
    right: '0',
    bottom: '0',
    left: '0',
    zIndex: '1050',
    overflowScrolling: 'touch',
    outline: '0',
    textAlign: 'center',
    fontSize: '0',
    whiteSpace: 'nowrap'
  }

  static defaultContentStyles = {
    zIndex: '999',
    minWidth: '400px',
    minHeight: '200px',
  }

  render() {  
    const modalLayerProps = {
      style: Modal.defaultLayerStyles,
      className: ''
    };
    const modalContentProps = {
      style: Modal.defaultContentStyles,
    }
    const { 
      contentStyle, 
      layerStyle, 
      contentClass,
      layerClass, 
      children, 
      isClose, 
      onClose 
    } = this.props;

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

    if (!this.node) {
      this.node = document.createElement('div');
    }

    const modalLayer = (
      <React.Fragment>
        <div className="modal-backdrop"></div>
        <div className={modalLayerProps.className} style={modalLayerProps.style}>
          {isClose && (
            <div className="modal-close" onClick={onClose}>
              <span className="modal-close-icon">
                <FontAwesomeIcon icon="times-circle" />
              </span>
            </div>
          )}
          <div className={modalContentProps.className} style={modalContentProps.style}>
            {children}
          </div>
        </div>        
      </React.Fragment>
    );
    return ReactDOM.createPortal(modalLayer, this.node);
  }
}

export default Modal;