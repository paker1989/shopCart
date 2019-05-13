import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import ColorBoardWrapper from './commons/ColorWrapper.js';

import Saturation from './commons/Saturation';

const Sketch = ({
  prefix,
  color,
  hsl,
  hsv,
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
    </div>
  );
}

export default ColorBoardWrapper(Sketch);