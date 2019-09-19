import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './App';
import Store from './store';

import { initGoogleService } from './assets/scripts/googlePlace.init';
import '../../lib/style/iconfont.scss';
import '../../lib/scripts/iconfont';

window.initGoogleService = initGoogleService; // as callback

ReactDOM.render(
    <Provider store={Store}><App /></Provider>,
    document.getElementById('root')
);

console.log(process.env.NODE_ENV);

if (module.hot && process.env.NODE_ENV === 'development') {
    module.hot.accept();
}
