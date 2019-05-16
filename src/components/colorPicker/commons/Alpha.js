import React from 'react';
import throttle from 'lodash/throttle';

import calculateChange from '../helpers/alpha';
import { get } from '../helpers/checkboard';

class Alpha extends React.Component {
  constructor(props) {
    super(props);
    this.containerRef = React.createRef();
  }

  handleChange = throttle((evt, skip) => {
    const { onChange, hsl } = this.props;
    const containerNode = this.containerRef.current;
    onChange({
      h: hsl.h,
      s: hsl.s,
      l: hsl.l,
      a: calculateChange(evt, skip, containerNode),
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
    const { prefix, hsl, rgb } = this.props,
          { r, g, b } = rgb;
    
    let sliderPos = {left: `${parseInt(hsl.a*100)}%`},
        wraperStyle = {
          background: `linear-gradient(to right, rgb(${r}, ${g}, ${b}, 0%),
            rgb(${r}, ${g}, ${b}, 100%))`
        },
        checkBoardBg = {
          background: `url(${get('transparent', 'rgba(0,0,0,.08)', 8)}) left center`
        }
    
    return (
      <div ref={this.containerRef} className={`${prefix}-alpha-area`}
           style={wraperStyle}
           onMouseDown={this.handleMouseDown}
           onTouchMove={this.handleChange}
           onTouchStart={this.handleChange}>
        <div className={`${prefix}-alpha-checkboard`} style={checkBoardBg}>
        </div>
        <div className={`${prefix}-alpha-slider`} style={sliderPos}>
        </div>
      </div>
    );
  }
}

export default Alpha;