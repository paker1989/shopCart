import { takeLatest } from 'redux-saga/effects';

import * as LayoutActionTypes from '../actionType/layoutActionType';

function* loadSimpleEvtsData(date) {
    console.log(date);
    console.log('load simpleEvts');
}

export function* loadCalEvtsSaga() {
    yield takeLatest(LayoutActionTypes.CHANGE_LOCALE, loadSimpleEvtsData);
}
