import React from 'react';
import ReactDOM from 'react-dom';
import isNumber from 'lodash/isNumber';

import NotifyContent from './NotifyContent';
import './notify.scss';

const NotifyGlobalOptions = {
  duration: 1000
}

const notifies = {};
let containerId = 0;

const getContainerNode = function() {
  let containerNode = document.querySelector('.bxu-notify-container');
  if (!containerNode) {
    containerNode = document.createElement('div');
    containerNode.className = 'bxu-notify-container';
    document.body.appendChild(containerNode);
  }
  return containerNode;
}

function show(type, content, duration, closeCallback) {
  const container = document.createElement('div'),
        containerNode = getContainerNode(),
        currentId = containerId;

  ReactDOM.render(
    <NotifyContent
      type={type}
      isIn={true}
      content={content}
      containerNode={containerNode}
    />, container);
  
  const timerId = setTimeout(function() {
    ReactDOM.render(
      <NotifyContent
        type={type}
        isIn={false}
        content={content}
        closeCallback={() => {closeNotify(currentId)}}
        containerNode={containerNode}
      />, container)
  }, duration || NotifyGlobalOptions.duration);

  notifies[currentId] = {
    timerId,
    container,
    closeCallback
  };

  containerId++;
}

export const success = (content, duration, closeCallback) => {
  show('success', content, duration, closeCallback);
}

export const error = (content, duration, closeCallback) => {
  show('error', content, duration, closeCallback);
}

export const config = (options) => {
  const { duration } = options;
  if (duration && isNumber(duration)) {
    NotifyGlobalOptions.duration = duration;
  }
}

export const closeNotify = (containerId) => {
  if (notifies[containerId]) {
    const { oncloseCallback, timerId, container } = notifies[containerId];
    clearTimeout(timerId);
    ReactDOM.unmountComponentAtNode(container);
    delete notifies[containerId];

    if (oncloseCallback) {
      oncloseCallback();
    }
  }
}