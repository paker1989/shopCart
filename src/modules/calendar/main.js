import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import App from './App';
import Store from './store';

import { initGoogleService } from './assets/scripts/googlePlace.init';
import '../../lib/style/iconfont.scss';
import '../../lib/scripts/iconfont';

window.initGoogleService = initGoogleService; // as callback

ReactDOM.render(
    <Provider store={Store}>
        <Router basename="/">
            <Route path="/:lang/:layout/:year/:month/:date" component={App} />
        </Router>
    </Provider>,
    document.getElementById('root')
);

console.log(process.env.NODE_ENV);

if (module.hot && process.env.NODE_ENV === 'development') {
    module.hot.accept();
}
