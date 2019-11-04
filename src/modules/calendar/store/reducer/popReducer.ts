import * as PopActionType from '../actionType/popActionType';
import { CalendarRedux } from '../../utils/reduxTypes';

// interface IIntPopReducerStats
//     extends CalendarRedux.IGlobalDefinerProps,
//         CalendarRedux.IDefinerPopStats {}

const initialState: CalendarRedux.TPopReducerStatsType = {
    defShowPop: false,
    defTimeRange: null,
    defPositionner: null,
    defTopCurshion: 0,
    defBottomCurshion: 0,
    defAsideCurshion: 0,
    defPopId: null,
    initDayEvtValue: false,
    globalInitStatus: 'stop',
    ctxMenuX: 0,
    ctxMenuY: 0,
    ctxMenuType: 'activity',
    ctxMenuEvtId: null,
    ctxMenuVisible: false,
};

export default function(
    state = initialState,
    action: CalendarRedux.IReduxAction
) {
    switch (action.type) {
        case PopActionType.UPDATE_DEF_DATA:
            return { ...state, ...action.payload };
        case PopActionType.UPDATE_CXTMENU_PROPS:
            return { ...state, ...action.payload };
        default:
            return state;
    }
}
