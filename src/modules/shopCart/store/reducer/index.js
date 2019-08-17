import { combineReducers } from 'redux';

import productReducers from './productReducer';
import sortReducers from './sortReducer';
import filterReducers from './filterReducer';
import floatCartsReducers from './floatCartReducer';

const combinedReducers = combineReducers({
  products: productReducers,
  filters: filterReducers,
  sort: sortReducers,
  floatCarts: floatCartsReducers
}
);

export default combinedReducers;