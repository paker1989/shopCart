import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { initGoogleService } from './assets/scripts/googlePlace.init';
import '../../lib/style/iconfont.scss';
import '../../lib/scripts/iconfont';

window.initGoogleService = initGoogleService; // as callback

ReactDOM.render(< App />, document.getElementById('root'));

console.log(process.env.NODE_ENV);

if (module.hot && process.env.NODE_ENV === 'development') {
  module.hot.accept();
}