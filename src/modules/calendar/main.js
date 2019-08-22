import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import '../../lib/style/iconfont.scss';
import '../../lib/scripts/iconfont';

ReactDOM.render(< App />, document.getElementById('root'));

console.log(process.env.NODE_ENV);

if (module.hot && process.env.NODE_ENV === 'development') {
  module.hot.accept();
}