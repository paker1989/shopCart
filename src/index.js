import React from 'react';
import ReactDOM from 'react-dom';

import App from './containers';
import store from './store';
import routes from './routes';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faStroopwafel, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

library.add(faStroopwafel);
library.add(faTimesCircle);

ReactDOM.render(<App store={store} routes={routes}/>, document.getElementById('root'));