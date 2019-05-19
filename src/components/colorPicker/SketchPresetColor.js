import React from 'react';
import cx from 'classnames';

export default (props) => {
  const {
    onClick,
    type,
    presetColors = [],
  } = props;
  
  let wrapperClass = cx({
    ['sketch-preset-color-container']: true,
    [`sketch-presetcolor_${type}`]: true
  });

  return (
    <div className={wrapperClass}>
      {presetColors.map((color, index) => {
        return (
          <div key={index} 
                className='sketch-preset-color_block'
                style={{background: color }}
                onClick={() => {onClick(color)}}
          >
          </div>
        );
      })}
    </div>
  );
  
}