import React from 'react';
import throttle from 'lodash/throttle';
import calculateChange from '../helpers/hue';


class Alpha extends React.Component {
  constructor(props) {
    super(props);
    this.containerRef = React.createRef();
  }

  handleChange = throttle((evt, skip) => {
    const { onChange, hsl } = this.props;
    const containerNode = this.containerRef.current;
    onChange({
      h: calculateChange(evt, skip, containerNode),
      s: hsl.s,
      l: hsl.l,
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
    const { prefix, hsl } = this.props;
    console.log('a: ' + hsl.a);
    let sliderPos = {
      left: `${parseInt(hsl.a*100)}%`
    }

    return (
      <div ref={this.containerRef} className={`${prefix}-alpha-area`}
           onMouseDown={this.handleMouseDown}
           onTouchMove={this.handleChange}
           onTouchStart={this.handleChange}>
        <div className={`${prefix}-alpha-slider`} style={sliderPos}>
        </div>
      </div>
    );
  }
}

export default Alpha;