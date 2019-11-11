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
    dayPresenterShowPop: false,
    dayPresenterDate: null,
    dayPresenterPositionner: null,
    dayPresenterTopCurshion: 0,
    dayPresenterBottomCurshion: 0,
    dayPresenterAsideCurshion: 0,
    dayPresenterPopId: null,
};

export default function(
    state = initialState,
    action: CalendarRedux.IReduxAction
) {
    let defShowPop, viewShowPop, ctxMenuVisible, dayPresenterShowPop;
    switch (action.type) {
        case PopActionType.UPDATE_DEF_DATA:
            if (action.payload.defShowPop) {
                ctxMenuVisible = false;
                viewShowPop = false;
                dayPresenterShowPop = false;
                return {
                    ...state,
                    ...action.payload,
                    ctxMenuVisible,
                    viewShowPop,
                    dayPresenterShowPop,
                };
            } else {
                return { ...state, ...action.payload };
            }
        case PopActionType.UPDATE_CXTMENU_PROPS:
            if (action.payload.ctxMenuVisible) {
                defShowPop = false;
                viewShowPop = false;
                dayPresenterShowPop = false;
                return {
                    ...state,
                    ...action.payload,
                    defShowPop,
                    viewShowPop,
                    dayPresenterShowPop,
                };
            } else {
                return { ...state, ...action.payload };
            }

        case PopActionType.UPDATE_VIEW_PROPS:
            if (action.payload.viewShowPop) {
                ctxMenuVisible = false;
                defShowPop = false;
                dayPresenterShowPop = false;
                return {
                    ...state,
                    ...action.payload,
                    ctxMenuVisible,
                    defShowPop,
                    dayPresenterShowPop,
                };
            } else {
                return { ...state, ...action.payload };
            }
        case PopActionType.UPDATE_DAY_PRESENTER_PROPS:
            if (action.payload.dayPresenterShowPop) {
                ctxMenuVisible = false;
                defShowPop = false;
                viewShowPop = false;
                return {
                    ...state,
                    ...action.payload,
                    ctxMenuVisible,
                    defShowPop,
                    viewShowPop,
                };
            } else {
                return { ...state, ...action.payload };
            }
        default:
            return state;
    }
}
