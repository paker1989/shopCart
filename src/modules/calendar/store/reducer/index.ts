import { combineReducers } from 'redux';
import dateReducers from './dateReducer';
import layoutReducers from './layoutReducer';
import popReducers from './popReducer';
import evtsReducers from './evtsReducer';

const combinedReducers = combineReducers({
    dateReducers,
    layoutReducers,
    popReducers,
    evtsReducers,
});

export default combinedReducers;
