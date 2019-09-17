import { combineReducers } from 'redux';
import dateReducers from './dateReducer';

const combinedReducers = combineReducers({
  dateReducers
});

export default combinedReducers;
