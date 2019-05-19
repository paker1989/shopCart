import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import Popover from '../popover';
import SketchPresetColor from './SketchPresetColor';
import ColorBoard from './ColorBoard';
import noop from 'lodash/noop';
import { defaultPresetColors } from './helpers/color';

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
    showAlpha: PropTypes.bool,
  }

  static defaultProps = {
    type: 'colorBoard',
    prefix: 'bxu',
    showAlpha: false,
    onChange: noop,
    showAlpha: true,
    presetColors: defaultPresetColors,
  }

  static ColorBoard = ColorBoard;

  render() {
    const {
      prefix,
      type,
      color,
      onChange,
      wrapperClassName,
      presetColors,
      showAlpha
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
          presetColors={presetColors}
          showAlpha={showAlpha}
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