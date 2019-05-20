import React from 'react';
import ReactDOM from 'react-dom';

import App from './containers';
import store from './store';
import routes from './routes';

import iconLibrary from './utils/getIcons';

ReactDOM.render(<App store={store} routes={routes}/>, document.getElementById('root'));