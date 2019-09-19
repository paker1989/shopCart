import { takeLatest, all } from 'redux-saga/effects';

import * as LayoutActionTypes from '../actionType/layoutActionType';
import { reloadLangSaga } from './reloadLanguage.saga';

export function* reloadLanguageSaga() {
    yield takeLatest(LayoutActionTypes.CHANGE_LOCALE, reloadLangSaga);
}

export default function* rootSaga() {
    yield all([reloadLanguageSaga()]);
}
