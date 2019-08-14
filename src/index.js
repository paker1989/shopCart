import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import store from './store';
import './style/markdown.scss';
import './style/iconfont.scss';

import './iconfont';


ReactDOM.render( < App store = { store }
        />, document.getElementById('root'));

        if (module.hot) {
            module.hot.accept();
        }