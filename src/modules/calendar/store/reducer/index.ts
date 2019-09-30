import { combineReducers } from 'redux';
import dateReducers from './dateReducer';
import layoutReducers from './layoutReducer';
import popReducers from './popReducer';

const combinedReducers = combineReducers({
    dateReducers,
    layoutReducers,
    popReducers,
});

export default combinedReducers;
