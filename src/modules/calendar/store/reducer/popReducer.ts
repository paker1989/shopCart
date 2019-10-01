import * as PopActionType from '../actionType/popActionType';
import { CalendarRedux } from '../../utils/reduxTypes';

// interface IIntPopReducerStats
//     extends CalendarRedux.IGlobalDefinerProps,
//         CalendarRedux.IDefinerPopStats {}

const initialState: CalendarRedux.IDefinerPopStats = {
    defShowPop: false,
    defTimeRange: null,
    defPositionner: null,
    defTopCurshion: 0,
    defBottomCurshion: 0,
    defAsideCurshion: 0,
    defPopId: null,
    initDayEvtValue: false,
    globalInitStatus: 'stop',
};

export default function(
    state = initialState,
    action: CalendarRedux.IReduxAction
) {
    switch (action.type) {
        case PopActionType.UPDATE_DEF_DATA:
            return { ...state, ...action.payload };
        default:
            return state;
    }
}
