import { takeLatest, put } from 'redux-saga/effects';
import axios from 'axios';
import * as EvtsActionTypes from '../actionType/evtsActionType';

function* saveEvtsData(reqObj) {
    const { evt } = reqObj.payload;
    // const formattedDates = dates.map(date => getYYYYMMDDDate(date));
    try {
        // const res = yield axios.get('/static/data/dev/calWeekEvents.json', {
        //     params: { dates: formattedDates },
        // });
        // if (res && res.data) {
        //     yield put({
        //         type: EvtsActionTypes._FETCH_EVTS_OF_DATES_SUCCESS,
        //         payload: {
        //             data: res.data,
        //         },
        //     });
        // }
        console.log('saveEvtsData: ');
        console.log(evt);
    } catch (error) {
        console.log(error);
    }
}

export function* saveCalEvtsSaga() {
    yield takeLatest(EvtsActionTypes._SAVE_EVT_, saveEvtsData);
}
