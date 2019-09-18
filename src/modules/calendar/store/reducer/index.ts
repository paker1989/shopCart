import { combineReducers } from 'redux';
import dateReducers from './dateReducer';
import layoutReducers from './layoutReducer';

const combinedReducers = combineReducers({
    dateReducers,
    layoutReducers,
});

export default combinedReducers;
