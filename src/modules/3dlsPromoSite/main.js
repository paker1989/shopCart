import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import 'zent/css/index.css';
// import '../../lib/style/iconfont.scss';
// import '../../lib/scripts/iconfont';

ReactDOM.render(< App />, document.getElementById('root'));

if (module.hot && process.env.NODE_ENV === 'development') {
  module.hot.accept();
}