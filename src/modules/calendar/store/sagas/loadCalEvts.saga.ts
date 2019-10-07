import { takeLatest, put } from 'redux-saga/effects';
import axios from 'axios';
import * as EvtsActionTypes from '../actionType/evtsActionType';
import { getYYYYMMDDDate } from '../../utils/timeUtils';

function* loadEvtsData(reqObj) {
    const dateKey = getYYYYMMDDDate(reqObj.date);
    try {
        const res = yield axios.get('/static/data/dev/calEvents.json', {
            params: dateKey,
        });

        if (res && res.data) {
            yield put({
                type: EvtsActionTypes._FETCH_EVTS_SUCCESS,
                payload: {
                    dateKey,
                    evts: res.data.evts,
                },
            });
        } else {
            yield put({
                type: EvtsActionTypes._FETCH_EVTS_ERROR,
                payload: {
                    dateKey,
                },
            });
        }
    }
    catch (error) {
        console.log(error);
        yield put({
            type: EvtsActionTypes._FETCH_EVTS_ERROR,
            payload: {
                dateKey,
            },
        });
    }

}

export function* loadCalEvtsSaga() {
    yield takeLatest(EvtsActionTypes._FETCH_EVTS, loadEvtsData);
}
