import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import ColorBoardWrapper from './commons/ColorWrapper.js';

import Saturation from './commons/Saturation';
import Hue from './commons/Hue';
import Alpha from './commons/Alpha';

const Sketch = ({
  prefix,
  // color,
  hex,
  hsl,
  hsv,
  rgb,
  onChange,
}) => {

  return (
    <div className={`${prefix}-colorboard-container`}>
      <Saturation 
        prefix={prefix}
        hsl={hsl}
        hsv={hsv}
        onChange={onChange}
      />
      <div className={`${prefix}-colorboard-slider`}>
        <div className={`${prefix}-colorboard-slider_huewrapper`}>
          <Hue 
            prefix={prefix}
            hsl={hsl}
            onChange={onChange}
          />
        </div>
        <div className={`${prefix}-colorboard-slider_alphawrapper`}>
          <Alpha 
            prefix={prefix}
            hsl={hsl}
            rgb={rgb}
            onChange={onChange}/>
        </div>
        <div className={`${prefix}-colorboard-editinput_wrapper`}>
          <SketchFields
            prefix={prefix}
            rgb={rgb}
            hex={hex} 
            onChange={onChange}/>
        </div>
      </div>
    </div>
  );
}

export default ColorBoardWrapper(Sketch);