import { takeLatest } from 'redux-saga/effects';

import * as DateActionTypes from '../actionType/dateActionType';

function* loadSimpleEvtsData(date) {
    console.log(date);
    console.log('load simpleEvts');
}

export function* loadCalEvtsSaga() {
    yield takeLatest(DateActionTypes.LOAD_SIMPLE_EVTS_DATA, loadSimpleEvtsData);
}
