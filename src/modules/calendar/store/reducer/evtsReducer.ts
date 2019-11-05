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
        case EvtsActionType._UPDATE_EVT_SUCCESS:
            const { item } = action.payload;
            const updatedItemKey = getDateKey(item);

            if (!state.cachedEvts[updatedItemKey]) {
                state.cachedEvts[updatedItemKey] = [item];
            } else {
                let index = state.cachedEvts[updatedItemKey].findIndex(
                    e => e._id == item._id
                );
                if (index != -1) {
                    state.cachedEvts[updatedItemKey].splice(index, 1);
                }
                state.cachedEvts[updatedItemKey] = [
                    ...state.cachedEvts[updatedItemKey],
                    item,
                ];
            }
            return { ...state };
        case EvtsActionType._DELETE_EVT_SUCCESS:
            const { deletedItem } = action.payload;
            const deletedItemKey = getDateKey(deletedItem);
            if (state.cachedEvts[deletedItemKey]) {
                let index = state.cachedEvts[deletedItemKey].findIndex(
                    e => e._id == deletedItem._id
                );
                if (index != -1) {
                        state.cachedEvts[deletedItemKey].splice(index, 1);
                }
                state.cachedEvts[deletedItemKey] = [...state.cachedEvts[deletedItemKey]];
            }
            return { ...state };
        default:
            return state;
    }
}
