import { createStore, applyMiddleware } from 'redux';
import reducers from './reducer';

// const initialStates = {};
// const _devtools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
const { composeWithDevTools } = require('redux-devtools-extension');

const Store = createStore(
  reducers,
  composeWithDevTools(),
  // applyMiddleware(...middlewares)
);

export default Store;