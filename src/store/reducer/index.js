import { combineReducers } from 'redux';

import productReducers from './productReducer';
import sortReducers from './sortReducer';
import filterReducers from './filterReducer';

const combinedReducers = combineReducers({
  products: productReducers,
  filters: filterReducers,
  sort: sortReducers
}
);

export default combinedReducers;