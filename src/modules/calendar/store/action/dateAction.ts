import * as DateActionType from '../actionType/dateActionType';
import { populateMonthWeekByDate } from '../../utils/timeUtils';
import { CalendarRedux } from '../../utils/reduxTypes';

export const toNextDay = (currentDate: Date): CalendarRedux.IReduxAction => {
    const next = new Date(currentDate.setDate(currentDate.getDate() + 1));
    return {
        type: DateActionType.UPDATE_CURRENT_DATA,
        payload: { ...populateMonthWeekByDate(next) },
    };
};

export const toPrevDay = (currentDate: Date): CalendarRedux.IReduxAction => {
    const prev = new Date(currentDate.setDate(currentDate.getDate() - 1));
    return {
        type: DateActionType.UPDATE_CURRENT_DATA,
        payload: { ...populateMonthWeekByDate(prev) },
    };
};

export const toNextWeek = (currentDate: Date): CalendarRedux.IReduxAction => {
    const newDate = new Date(currentDate.setDate(currentDate.getDate() + 7));
    return {
        type: DateActionType.UPDATE_CURRENT_DATA,
        payload: { ...populateMonthWeekByDate(newDate) },
    };
};
export const toPrevWeek = (currentDate: Date): CalendarRedux.IReduxAction => {
    const newDate = new Date(currentDate.setDate(currentDate.getDate() - 7));
    return {
        type: DateActionType.UPDATE_CURRENT_DATA,
        payload: { ...populateMonthWeekByDate(newDate) },
    };
};

export const toNextMonth = (currentDate: Date): CalendarRedux.IReduxAction => {
    const newDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        1
    );
    return {
        type: DateActionType.UPDATE_CURRENT_DATA,
        payload: { ...populateMonthWeekByDate(newDate) },
    };
};

export const toPrevMonth = (currentDate: Date): CalendarRedux.IReduxAction => {
    const newDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() - 1,
        1
    );
    return {
        type: DateActionType.UPDATE_CURRENT_DATA,
        payload: { ...populateMonthWeekByDate(newDate) },
    };
};

export const toNextYear = (currentDate: Date): CalendarRedux.IReduxAction => {
    const newDate = new Date(currentDate);
    newDate.setFullYear(newDate.getFullYear() + 1);
    return {
        type: DateActionType.UPDATE_CURRENT_DATA,
        payload: { ...populateMonthWeekByDate(newDate) },
    };
};

export const toPrevYear = (currentDate: Date): CalendarRedux.IReduxAction => {
    const newDate = new Date(currentDate);
    newDate.setFullYear(newDate.getFullYear() - 1);
    return {
        type: DateActionType.UPDATE_CURRENT_DATA,
        payload: { ...populateMonthWeekByDate(newDate) },
    };
};

export const toTargetDate = (currentDate: Date): CalendarRedux.IReduxAction => {
    const newDate = new Date(currentDate);
    return {
        type: DateActionType.UPDATE_CURRENT_DATA,
        payload: { ...populateMonthWeekByDate(newDate) },
    };
};