import * as DateActionType from '../actionType/dateActionType';
import { populateMonthWeekByDate } from '../../utils/timeUtils';
import { CalendarRedux } from '../../utils/reduxTypes';
// import { CalendarNS } from '../../utils/types';

export const toTargetDate = (currentDate: Date): CalendarRedux.IReduxAction => {
    const newDate = new Date(currentDate);
    return {
        type: DateActionType.UPDATE_CURRENT_DATA,
        payload: { ...populateMonthWeekByDate(newDate) },
    };
};

export const switchCalEvtDefinerSignal = (
    definerCalEvtSignal: boolean
): CalendarRedux.IReduxAction => {
    return {
        type: DateActionType.INIT_CALEVTDEFINER,
        payload: { definerCalEvtSignal },
    };
};

export const loadSimpleEvtData = (date: Date): CalendarRedux.IReduxAction => {
    return {
        type: DateActionType.LOAD_SIMPLE_EVTS_DATA,
        payload: { date },
    };
};
