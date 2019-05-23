import React from 'react';
import ReactDOM from 'react-dom';

// import App from './containers';
import App from './App';
import store from './store';
import routes from './routes';

import iconLibrary from './utils/getIcons';

ReactDOM.render(<App store={store}/>, document.getElementById('root'));