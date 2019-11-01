import * as EvtsActionType from '../actionType/evtsActionType';
import CalConfig from '../../assets/scripts/calendar.config';
import { CalendarRedux } from '../../utils/reduxTypes';
import { getDateKey } from '../../utils/timeUtils';
const maxCache = CalConfig.maxEvtCache;

const initialState = {
    cachedEvts: {},
    globalSaveStatus: {
        status: 'none', // 'none', 'success'
        eventId: null,
        type: null,
    },
};

export default function(
    state = initialState,
    action: CalendarRedux.IReduxAction
) {
    switch (action.type) {
        case EvtsActionType._FETCH_EVTS_SUCCESS:
            const { dateKey, evts } = action.payload;
            state.cachedEvts[dateKey] = evts;
            return { ...state };

        case EvtsActionType._FETCH_EVTS_ERROR:
            state.cachedEvts[action.payload.dateKey] = [];
            return { ...state };

        case EvtsActionType._FETCH_MONTH_EVTS_SUCCESS:
        case EvtsActionType._FETCH_EVTS_OF_DATES_SUCCESS:
            const { data } = action.payload;
            data.forEach((evts, dateKey) => {
                state.cachedEvts[dateKey] = evts.slice(0);
            });
            return { ...state };

        case EvtsActionType._SAVE_EVT_SUCCESS: //only work for new item, NOT FOR UPDATE!!!
            const { newItem } = action.payload;
            const key = getDateKey(newItem);
            state.globalSaveStatus = {
                status: 'succeed',
                eventId: newItem._id,
                type: newItem.type,
            };
            if (!state.cachedEvts[key]) {
                state.cachedEvts[key] = [newItem];
            } else {
                state.cachedEvts[key] = [...state.cachedEvts[key], newItem];
            }
            return { ...state };

        case EvtsActionType._RESET_SAVE_STATUS:
            state.globalSaveStatus = {
                status: 'none',
                eventId: null,
                type: null,
            };
            return { ...state };
        default:
            return state;
    }
}
