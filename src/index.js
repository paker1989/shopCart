import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import iconLibrary from './utils/getIcons';

import store from './store';
import './style/markdown.scss';

ReactDOM.render(<App store={store}/>, document.getElementById('root'));