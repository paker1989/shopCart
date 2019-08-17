import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import './style/markdown.scss';
import '../../lib/style/iconfont.scss';

import '../../lib/scripts/iconfont';

ReactDOM.render(< App />, document.getElementById('root'));

if (module.hot) {
  module.hot.accept();
}