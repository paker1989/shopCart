import { all } from 'redux-saga/effects';

import { reloadLanguageSaga } from './reloadLanguage.saga';
import { loadCalEvtsSaga } from './loadCalEvts.saga';

export default function* rootSaga() {
    yield all([reloadLanguageSaga(), loadCalEvtsSaga()]);
}
