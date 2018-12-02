import { createStore, applyMiddleware } from 'redux';
import reducers from './reducer';
import thunk from 'redux-thunk';

const initialStates = {};
const middlewares = [thunk];

const Store = createStore(
  reducers,
  initialStates,
  applyMiddleware(...middlewares)
);

export default Store;