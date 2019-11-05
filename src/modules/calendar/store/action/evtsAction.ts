import * as EvtsActionType from '../actionType/evtsActionType';
import { CalendarRedux } from '../../utils/reduxTypes';
import { CalEvtDataNS } from '../../utils/evtTypes';

export const fetchEvts = (date: Date): CalendarRedux.IReduxAction => ({
    type: EvtsActionType._FETCH_EVTS,
    payload: { date },
});

export const fetchMonthEvts = (
    year: number,
    month: number
): CalendarRedux.IReduxAction => ({
    type: EvtsActionType._FETCH_MONTH_EVTS,
    payload: { year, month: month + 1 },
});

export const fetchEvtsOfDates = (
    dates: Date[]
): CalendarRedux.IReduxAction => ({
    type: EvtsActionType._FETCH_EVTS_OF_DATES,
    payload: { dates },
});

export const saveEvt = (
    evt: CalEvtDataNS.ICalEvtCompleteDataModelType
): CalendarRedux.IReduxAction => ({
    type: EvtsActionType._SAVE_EVT_,
    payload: { evt },
});

export const resetSaveEvtStatus = (): CalendarRedux.IReduxAction => ({
    type: EvtsActionType._RESET_SAVE_STATUS,
});

export const updateEvt = (
    id: any,
    updates: CalEvtDataNS.ICalEvtUpdatableProps,
    originalType: string
): CalendarRedux.IReduxAction => ({
    type: EvtsActionType._UPDATE_EVT,
    payload: {
        originalType,
        updates,
        id,
    },
});
