import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import Popover from '../popover';
import SketchPresetColor from './SketchPresetColor';
import ColorBoard from './ColorBoard';
import noop from 'lodash/noop';

import './colorPicker.scss';

class ColorPicker extends React.PureComponent {
  static propTypes = {
    prefix: PropTypes.string,
    className: PropTypes.string,
    wrapperClassName: PropTypes.string,
    type: PropTypes.oneOf(['simple', 'colorBoard']),
    color: PropTypes.string,
    onChange: PropTypes.func,
    showAlpha: PropTypes.bool,
    presetColors: PropTypes.array,
  }

  static defaultProps = {
    type: 'colorBoard',
    prefix: 'bxu',
    showAlpha: false,
    onChange: noop,
    presetColors: [
      '#FFFFFF',
      '#F8F8F8',
      '#F2F2F2',
      '#999999',
      '#444444',
      '#FF4444',
      '#FF6500',
      '#FF884D',
      '#FFCD00',
      '#3FBD00',
      '#3FBC87',
      '#00CD98',
      '#5197FF',
      '#BADCFF',
      '#FFEFB8',
    ],
  }

  static ColorBoard = ColorBoard;

  render() {
    const {
      prefix,
      type,
      color,
      onChange,
      wrapperClassName,
      presetColors
    } = this.props;

    let popOverTrigger, 
        popOverContent,
        triggerClassWrapper;
    
    triggerClassWrapper = cx({
      [`${prefix}-colorpicker-trigger`]: true,
    }, wrapperClassName);

    popOverTrigger = (
      <div className={triggerClassWrapper}>
        <div className={`${prefix}-colorpicker-trigger_content`} 
            style={{background: color}}>
        </div>
      </div>
    );

    if (type === 'simple') {
      popOverContent = (
        <SketchPresetColor
          type={type}
          onClick={onChange}
          presetColors={presetColors}
        />
      );
    } else {
      popOverContent = (
        <ColorBoard 
          prefix={prefix}
          color={color}
          onChange={onChange}
        />
      );
    }

    return (
      <Popover wrapperClassName="colorpicker-container"
               position={Popover.Placement.autoBottomLeft}
               cushion={2}
      >
        <Popover.Trigger.ClickTrigger>
          {popOverTrigger}
        </Popover.Trigger.ClickTrigger>
        <Popover.Content>
          {popOverContent}
        </Popover.Content>
      </Popover>
    );
  }
}

export default ColorPicker;