import { takeLatest, put } from 'redux-saga/effects';
import axios from 'axios';
import * as EvtsActionTypes from '../actionType/evtsActionType';
import { getYYYYMMDDDate } from '../../utils/timeUtils';

function* loadEvtsData(reqObj) {
    const dateKey = getYYYYMMDDDate(reqObj.payload.date);
    try {
        const res = yield axios.post('/events/getDayEvents', {
            params: { dateKey },
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
    } catch (error) {
        console.log(error);
        yield put({
            type: EvtsActionTypes._FETCH_EVTS_ERROR,
            payload: {
                dateKey,
            },
        });
    }
}

function* loadMonthEvtsData(reqObj) {
    const { year, month } = reqObj.payload;
    try {
        const res = yield axios.post('/events/getMonthEvents', {
            params: { year, month },
        });
        if (res && res.data) {
            yield put({
                type: EvtsActionTypes._FETCH_MONTH_EVTS_SUCCESS,
                payload: {
                    data: res.data,
                },
            });
        }
        // else {
        //     yield put({
        //         type: EvtsActionTypes._FETCH_EVTS_ERROR,
        //         payload: {
        //             dateKey,
        //         },
        //     });
        // }
    } catch (error) {
        // console.log(error);
        // yield put({
        //     type: EvtsActionTypes._FETCH_EVTS_ERROR,
        //     payload: {
        //         dateKey,
        //     },
        // });
    }
}

function* loadEvtsOfDatesData(reqObj) {
    const { dates } = reqObj.payload;
    const formattedDates = dates.map(date => getYYYYMMDDDate(date));
    try {
        const res = yield axios.get('/static/data/dev/calWeekEvents.json', {
            params: { dates: formattedDates },
        });
        if (res && res.data) {
            yield put({
                type: EvtsActionTypes._FETCH_EVTS_OF_DATES_SUCCESS,
                payload: {
                    data: res.data,
                },
            });
        }
    } catch (error) {
        console.log(error);
    }
}

export function* loadCalEvtsSaga() {
    yield takeLatest(EvtsActionTypes._FETCH_EVTS, loadEvtsData);
    yield takeLatest(EvtsActionTypes._FETCH_MONTH_EVTS, loadMonthEvtsData);
    yield takeLatest(EvtsActionTypes._FETCH_EVTS_OF_DATES, loadEvtsOfDatesData);
}
