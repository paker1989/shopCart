import { takeLatest, put } from 'redux-saga/effects';
import axios from 'axios';
import * as EvtsActionTypes from '../actionType/evtsActionType';

function* saveEvtsData(reqObj) {
    const { evt } = reqObj.payload;
    // const formattedDates = dates.map(date => getYYYYMMDDDate(date));
    try {
        const res = yield axios.post('/events/saveEvent', {
            params: { evt },
        });

        if (res && res.data) {
            yield put({
                type: EvtsActionTypes._SAVE_EVT_SUCCESS,
                payload: {
                    newItem: res.data.event,
                },
            });
        }
    } catch (error) {
        console.log(error);
    }
}

export function* saveCalEvtsSaga() {
    yield takeLatest(EvtsActionTypes._SAVE_EVT_, saveEvtsData);
}
