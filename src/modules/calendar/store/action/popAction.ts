import * as PopActionType from '../actionType/popActionType';
import { CalendarRedux } from '../../utils/reduxTypes';

export const updateDefinerPop = (
    definerProps: CalendarRedux.IDefinerPopStats
): CalendarRedux.IReduxAction => ({
    type: PopActionType.UPDATE_DEF_DATA,
    payload: { ...definerProps },
});

export const updateGlobalEvtDefiner = (
    globalDefProps: CalendarRedux.IDefinerPopStats
): CalendarRedux.IReduxAction => ({
    type: PopActionType.UPDATE_GLOBAL_DEF_DATA,
    payload: { ...globalDefProps },
});

export const updateCxtMenuProps = (
    cxtMenuProps: CalendarRedux.ICxtMenuPropStats
): CalendarRedux.IReduxAction => ({
    type: PopActionType.UPDATE_CXTMENU_PROPS,
    payload: { ...cxtMenuProps },
});

export const updateViewPopProps = (
    viewPopProps: CalendarRedux.IViewPropStats
): CalendarRedux.IReduxAction => ({
    type: PopActionType.UPDATE_VIEW_PROPS,
    payload: { ...viewPopProps },
});
