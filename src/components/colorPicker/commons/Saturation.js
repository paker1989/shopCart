/**
 * 饱和度调色盘
 */
import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

export default ({
  prefix,
}) => {
  
  return (
    <div className={`${prefix}-saturation-container`}>
      <div className={`${prefix}-colorboard-bg_white`}>
        <div className={`${prefix}-colorboard-bg_black`}>
        </div>
        <div>
          
        </div>
      </div>
    </div>
  );
}