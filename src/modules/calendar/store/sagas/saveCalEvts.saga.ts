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

function* updateEvtData(reqObj) {
    const { originalType, updates, id } = reqObj.payload;
    try {
        const res = yield axios.post('/events/updateEvent', {
            params: { originalType, updates, id },
        });

        if (res && res.data) {
            yield put({
                type: EvtsActionTypes._UPDATE_EVT_SUCCESS,
                payload: {
                    item: res.data.event,
                },
            });
        }
    } catch (error) {
        console.log(error);
    }
}

function* deleteEvtData(reqObj) {
    const { type, id } = reqObj.payload;
    try {
        const res = yield axios.post('/events/deleteEvent', {
            params: { type, id },
        });

        if (res && res.data) {
            yield put({
                type: EvtsActionTypes._DELETE_EVT_SUCCESS,
                payload: {
                    deletedItem: res.data.deletedItem,
                },
            });
        }
    } catch (error) {
        console.log(error);
    }
}

export function* saveCalEvtsSaga() {
    yield takeLatest(EvtsActionTypes._SAVE_EVT_, saveEvtsData);
    yield takeLatest(EvtsActionTypes._UPDATE_EVT, updateEvtData);
    yield takeLatest(EvtsActionTypes._DELETE_EVT, deleteEvtData);
}
