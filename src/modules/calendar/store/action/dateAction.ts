import * as DateActionType from '../actionType/dateActionType';
import { populateMonthWeekByDate } from '../../utils/timeUtils';
import { CalendarRedux } from '../../utils/reduxTypes';
// import { CalendarNS } from '../../utils/types';

export const toTargetDate = (currentDate: Date): CalendarRedux.IReduxAction => {
    const now = new Date();
    const newDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate(),
        now.getHours(),
        now.getMinutes()
    );
    return {
        type: DateActionType.UPDATE_CURRENT_DATA,
        payload: { ...populateMonthWeekByDate(newDate) },
    };
};
