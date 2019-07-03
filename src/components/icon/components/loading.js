import React from 'react';
import Icon from '../icon';

export default ({ width = 26, height = 26, ...props }) => {
  return (
    <Icon {...props}>
       <div style={{ width, height }} className="icon-loading"></div>
    </Icon>
  )
}