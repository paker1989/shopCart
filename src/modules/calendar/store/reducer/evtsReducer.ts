import * as EvtsActionType from '../actionType/evtsActionType';
import CalConfig from '../../assets/scripts/calendar.config';
import { CalendarRedux } from '../../utils/reduxTypes';

const maxCache = CalConfig.maxEvtCache;

const initialState = {
    cachedEvts: [],
};

export default function(
    state = initialState,
    action: CalendarRedux.IReduxAction
) {
    switch (action.type) {
        case EvtsActionType._FETCH_EVTS_SUCCESS:
            const { dateKey, evts } = action.payload;
            state.cachedEvts[dateKey] = {
                evts,
            };
            return state;
        case EvtsActionType._FETCH_EVTS_ERROR:
            // let { dateKey } = action.payload;
            state.cachedEvts[action.payload.dateKey] = {
                evts: [],
            };
            return state;
        default:
            return state;
    }
}
