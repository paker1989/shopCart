import React from 'react';
import ReactDOM from 'react-dom';
import Image from './image';

import './previewImage.scss';

export default (options) => {
  const { parentComponent, ...otherProps } = options;
  let container = document.createElement('div');

  const onClose = () => {
    console.log('onClose');
    ReactDOM.unmountComponentAtNode(container);
    container = undefined;
  }

  ReactDOM.render(
    <Image onClose={onClose} {...otherProps}/>, container);
}
