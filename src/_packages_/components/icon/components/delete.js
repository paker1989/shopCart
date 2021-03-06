import React from 'react';
import Icon from '../icon';

export default ({ width = 26, height = 26, visible = true, ...props }) => {
  return (
    <Icon visible={visible} {...props}>
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}
        xmlns="http://www.w3.org/2000/svg">
        <path d="M11.586 13l-2.293 2.293a1 1 0 0 0 1.414 1.414L13 14.414l2.293 2.293a1 1 0 0 0 1.414-1.414L14.414 13l2.293-2.293a1 1 0 0 0-1.414-1.414L13 11.586l-2.293-2.293a1 1 0 0 0-1.414 1.414L11.586 13z"
          fill="currentColor" fillRule="nonzero"></path>
      </svg>
    </Icon>
  )
}