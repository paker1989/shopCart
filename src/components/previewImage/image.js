import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import debounce from 'lodash/debounce';

import Modal from '../modal';


class Image extends React.Component {

  static propTypes = {
    className: PropTypes.string,
    prefix: PropTypes.string,
    showRotateBtn: PropTypes.bool,
    images: PropTypes.array,
    index: PropTypes.number,
    scaleRatio(props, propName, componentName) {
      const value = props[propName];
      if (value < 1) {
        return new Error(
          `Invalid prop \`${propName}\` in ${componentName}, ${propName} 
          should be greater than 1. Validation failed.`
        );
      }
    },
  }

  static defaultProps = {
    prefix: 'bxu',
    showRotateBtn: true,
    index: 0,
    scaleRatio: 1.5,
  }

  constructor(props) {
    super(props);
    const { index } = this.props;

    this.state = {
      currentIndex: index,
      rotateIndex: 0,
      isScale: false,
      imageStyle: {}
    }
  }

  rotate = () => {
    const { isScale, rotateIndex } = this.state;
    const { scaleRatio } = this.props;

    let deg = (rotateIndex + 1) * 90;
    let transformStyle = isScale ?
      `rotate(${deg}deg) scale(${scaleRatio})`
      : `rotate(${deg}deg) scale(1)`;

    this.setState({
      imageStyle: {
        transform: transformStyle,
        transitionDuration: '0.5s'
      },
      rotateIndex: rotateIndex + 1,
    });
  }

  toggleScale = () => {
    const { isScale, rotateIndex } = this.state;
    const { scaleRatio } = this.props;

    let deg = rotateIndex * 90;
    let transformStyle = isScale ?
      `rotate(${deg}deg) scale(1)`
      : `rotate(${deg}deg) scale(${scaleRatio})`;

    this.setState({
      imageStyle: {
        transform: transformStyle,
        transitionDuration: '0.5s'
      },
      isScale: !isScale,
    });
  }

  onMaskClick = (evt) => { // currenttarget总是指向事件绑定元素
    if (evt.target === evt.currentTarget) {
      this.props.onClose();
    }
  }

  navImage(direction) {
    const { images } = this.props;
    const { currentIndex } = this.state;
    let transformStyle = `rotate(0deg) scale(1)`,
        updateIndex;

    if (direction === 'prev') {
      updateIndex = currentIndex === 0? 
      images.length - 1: currentIndex - 1;
    } else {
      updateIndex = currentIndex === images.length - 1? 
        0: currentIndex + 1;
    }

    this.setState({
      currentIndex: updateIndex,
      imageStyle: {
        transform: transformStyle,
        transitionDuration: '0.5s'
      },
      isScale: false,
      rotateIndex: 0
    });
  }

  render() {
    const { 
      onClose,
      prefix,
      className, 
      images
    } = this.props;
    const { currentIndex, imageStyle, isScale } = this.state;

    const wrapperClass = cx({
      [`${prefix}-previewimg-container`]: true,
    }, className),
          imageClass = cx({
            [`${prefix}-image-self`]: true,
            [`${prefix}-image-scale`]: isScale,
          })

    return (
      <Modal contentClass={wrapperClass} isClose={true} onClose={onClose}>
        <div className={`${prefix}-previewimg-body`} onClick={this.onMaskClick}>
          {images.map((image, index) => {
            if (index == currentIndex) {
              return (
                <img
                  src={image}
                  key={index}
                  className={imageClass}
                  onClick={debounce(this.toggleScale, 200)}
                  style={imageStyle}
                />
              );
            }
            return null;
          })}
        </div>
        <div className={`${prefix}-previewimg-bar`}>
          {(images.length > 1) && (
            <span onClick={this.navImage.bind(this, 'prev')}>上一张</span>
          )}
          <span onClick={this.rotate}>翻动</span>
          {(images.length > 1) && (
            <span onClick={this.navImage.bind(this, 'next')}>下一张</span>
          )}
        </div>
      </Modal>
    );
  }
}

export default Image;