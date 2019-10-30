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
    payload: { year, month },
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
