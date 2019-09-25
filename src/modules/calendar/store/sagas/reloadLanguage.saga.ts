import { takeLatest } from 'redux-saga/effects';
import * as LayoutActionTypes from '../actionType/layoutActionType';

function* reloadLangSaga() {
    console.log('reload');
}

export function* reloadLanguageSaga() {
    yield takeLatest(LayoutActionTypes.CHANGE_LOCALE, reloadLangSaga);
}