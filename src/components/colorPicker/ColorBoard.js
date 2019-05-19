import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import ColorBoardWrapper from './commons/ColorWrapper.js';

import Saturation from './commons/Saturation';
import Hue from './commons/Hue';
import Alpha from './commons/Alpha';
import SketchFields from './commons/SketchFields';
import SketchPresetColor from './SketchPresetColor';
import { defaultPresetColors } from './helpers/color';

const Sketch = ({
  prefix,
  hex,
  hsl,
  hsv,
  rgb,
  presetColors,
  showAlpha,
  onChange,
}) => {
  presetColors = presetColors || defaultPresetColors;
  
  return (
    <div className={`${prefix}-colorboard-container`}>
      <div className={`${prefix}-colorboard-saturation_container`}>
        <Saturation 
          prefix={prefix}
          hsl={hsl}
          hsv={hsv}
          onChange={onChange}
        />
      </div>
      <div className={`${prefix}-colorboard-slider_container`}>
        <div className={`${prefix}-colorboard-slider_huewrapper`}>
          <Hue 
            prefix={prefix}
            hsl={hsl}
            onChange={onChange}
          />
        </div>
        {showAlpha && (
        <div className={`${prefix}-colorboard-slider_alphawrapper`}>
          <Alpha 
            prefix={prefix}
            hsl={hsl}
            rgb={rgb}
            onChange={onChange}/>
        </div>
        )}
        <div className={`${prefix}-colorboard-editinput_wrapper`}>
          <SketchFields
            prefix={prefix}
            rgb={rgb}
            hex={hex} 
            onChange={onChange}/>
        </div>
      </div>
      <div className={`${prefix}-colorboard-sketchcolor_wrapper`}>
        <SketchPresetColor
          onClick={onChange}
          type="colorBoard"
          presetColors={presetColors}/>
      </div>
    </div>
  );
}

export default ColorBoardWrapper(Sketch);