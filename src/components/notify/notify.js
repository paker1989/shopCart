import React from 'react';
import isNumber from 'lodash/isNumber';

import NotifyContent from './NotifyContent';

const NotifyGlobalOptions = {
  duration: 1000
}

export const success = (content, duration, closeCallback) => {
  console.log('success');
  React.createElement(NotifyContent, {
    type: 'success',
    content,
    duration,
    closeCallback,
  })
}

export const error = (content, duration, closeCallback) => {
  React.createElement(NotifyContent, {
    type: 'error',
    content,
    duration,
    closeCallback,
  })
}

export const config = (options) => {
  const { duration } = options;
  if (duration && isNumber(duration)) {
    NotifyGlobalOptions.duration = duration;
  }
}

export const clear = () => {
  
}