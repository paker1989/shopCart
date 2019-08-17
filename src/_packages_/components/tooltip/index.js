import React from 'react';
import ReactDOM, { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';

import './tooltip.scss';

const handleEvents = [
  'mouseover',
  'mousemove',
  'mouseleave'
]

class Tooltip extends React.Component {

  state = { clientX: 0, clientY: 0, isVisible: false, timeID: undefined };

  componentDidMount() {
    this.node = findDOMNode(this.props.showComponent);

    ['mouseover', 'mousemove'].forEach(event => {
      this.node.addEventListener(event, this.componentOver);
    })
    this.node.addEventListener('mouseleave', this.componentLeave);
  }

  componentWillUnmount() {
    this.destroy();
  }

  componentOver = (event) => {
    if (this.timeID) {
      clearTimeout(this.timeID);
    }
    this.timeID = setTimeout(() => {
      const { clientX, clientY } = event;

      this.setState((state) => ({
        clientX: clientX + 4,
        clientY: clientY + 4,
        isVisible: true
      }))
    }, 100);
  }
  
  componentLeave = () => {
    if (this.timeID) {
      clearTimeout(this.timeID);
    }
    this.setState((state) => ({
      isVisible: false
    }))
  }

  destroy = () => {
    if (this.node) {
      ['mouseover', 'mousemove'].forEach(event => {
        this.node.removeEventListener(event, this.componentOver);
      })
      this.node.removeEventListener('mouseleave', this.componentLeave);
    }
    document.body.removeChild(this.containerNode);
  }

  render() {
    const { clientX, clientY, isVisible } = this.state;

    const computeStyle = {
      left: clientX,
      top: clientY,
      visibility: isVisible? 'visible': 'hidden'
    }

    if (!this.containerNode) {
      this.containerNode = document.createElement('div');
      document.body.appendChild(this.containerNode);
    }

    const content = (
      <div className="react-tooltip" style={computeStyle}>
        {this.props.children}
      </div>    
    );

    return ReactDOM.createPortal(content, this.containerNode);
  }
}

Tooltip.prototypes = {
  showComponent: PropTypes.object.isRequired
}

export default Tooltip;
