/**
 * 饱和度调色盘
 */
import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

class Saturation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pointerPos: {
        top: '-2px',
        left: '80px'
      }
    }
  }

  handleChange = (e) => {
  
  }

  handleMouseDown = () => {
    window.addEventListener('mousedown', this.handleChange);
    window.addEventListener('mouseup', this.handleMouseUp);
  }

  handleMouseUp = () => {
    this.unbindEventListner();
  }

  unbindEventListner() {
    window.removeEventListener('mouseDown', this.handleChange);
    window.removeEventListener('mouseup', this.handleMouseUp);
  }

  render() {
    const {
      prefix,
      hsl
    } = this.props;

    let styles = {
      container: {
        background: `hsl(${hsl.h},100%, 50%)`,
      },
      pointer: {
        ...this.state.pointerPos,
      }
    };

    return (
      <div className={`${prefix}-saturation-container`}
           style={styles.container}
           onMouseDown={this.handleMouseDown}>
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