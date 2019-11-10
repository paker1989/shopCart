import * as PopActionType from '../actionType/popActionType';
import { CalendarRedux } from '../../utils/reduxTypes';

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
    ctxColor: null,
    viewShowPop: false,
    viewPositionner: null,
    viewTopCurshion: 0,
    viewBottomCurshion: 0,
    viewAsideCurshion: 0,
    viewPopId: null,
};

export default function(
    state = initialState,
    action: CalendarRedux.IReduxAction
) {
    let defShowPop, viewShowPop, ctxMenuVisible;
    switch (action.type) {
        case PopActionType.UPDATE_DEF_DATA:
            if (action.payload.defShowPop) {
                ctxMenuVisible = false;
                viewShowPop = false;
                return {
                    ...state,
                    ...action.payload,
                    ctxMenuVisible,
                    viewShowPop,
                };
            } else {
                return { ...state, ...action.payload };
            }
        case PopActionType.UPDATE_CXTMENU_PROPS:
            if (action.payload.ctxMenuVisible) {
                defShowPop = false;
                viewShowPop = false;
                return { ...state, ...action.payload, defShowPop, viewShowPop };
            } else {
                return { ...state, ...action.payload };
            }

        case PopActionType.UPDATE_VIEW_PROPS:
            if (action.payload.viewShowPop) {
                ctxMenuVisible = false;
                defShowPop = false;
                return {
                    ...state,
                    ...action.payload,
                    ctxMenuVisible,
                    defShowPop,
                };
            } else {
                return { ...state, ...action.payload };
            }
        default:
            return state;
    }
}
