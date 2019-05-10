import React from 'react';

export default (props) => {
  const {
    onClick,
    type,
    presetColors = [],
  } = props;
  
  if (type === 'simple') {
    return (
      <div className='sketch-preset-color-container'>
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
  } else {
    return null;
  }
}