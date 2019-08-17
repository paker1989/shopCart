import React from 'react';
import Icon from '../icon';

export default ({ width = 26, height = 26, visible = true, ...props }) => {
  return (
    <Icon visible={visible} {...props}>
       <div style={{ width, height }} className="icon-loading"></div>
    </Icon>
  )
}