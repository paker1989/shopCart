/**
 * 饱和度调色盘
 */
import React from 'react';
// import ReactDOM from 'react-dom';
// import PropTypes from 'prop-types';
// import cx from 'classnames';
import throttle from 'lodash/throttle';

import calculateChange from '../helpers/saturation';

class Saturation extends React.Component {
  constructor(props) {
    super(props);
    this.containerRef = React.createRef();
  }

  handleChange = throttle((e, skip) => {
    const { onChange, hsl } = this.props;
    const containerNode = this.containerRef.current;
    const { left, top } = calculateChange(e, skip, containerNode);
    onChange({
      h: hsl.h,
      s: parseInt(100*left)/100,
      l: parseInt(100*(1 - top))/100,
      a: hsl.a,
      source: 'rgb',
    })
  }, 50)
  

  handleMouseDown = (e) => {
    this.handleChange(e, true);
    window.addEventListener('mousemove', this.handleChange);
    window.addEventListener('mouseup', this.handleMouseUp);
  }

  handleMouseUp = () => {
    this.unbindEventListner();
  }

  unbindEventListner() {
    window.removeEventListener('mousemove', this.handleChange);
    window.removeEventListener('mouseup', this.handleMouseUp);
  }

  componentWillUnmount() {
    this.unbindEventListner();
  }

  render() {
    const {
      prefix,
      hsl,
    } = this.props;

    let pointerStyle = {
      left: `${Math.round(100 * hsl.s)}%`,
      top: `${100 - Math.round(100 * hsl.l)}%`
    }
    
    let styles = {
      container: {
        background: `hsl(${hsl.h},100%, 50%)`,
      },
      pointer: {
        ...pointerStyle,
      }
    };

    return (
      <div className={`${prefix}-saturation-container`}
           style={styles.container}
           onMouseDown={this.handleMouseDown}
           onTouchMove={this.handleChange}
           onTouchStart={this.handleChange}
           ref={this.containerRef}>
        <div className={`${prefix}-colorboard-bg_white`}>
          <div className={`${prefix}-colorboard-bg_black`}></div>
          <div className={`${prefix}-colorboard-pointer_wrapper`}
               style={styles.pointer}>
          </div>
        </div>
      </div>
    );
  }
}

export default Saturation;