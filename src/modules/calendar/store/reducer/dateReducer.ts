import * as DateActionType from '../actionType/dateActionType';
import { populateMonthWeekByDate } from '../../utils/timeUtils';
import { CalendarRedux } from '../../utils/reduxTypes';

const initialState = {
    ...populateMonthWeekByDate(new Date()),
};

export default function(
    state = initialState,
    action: CalendarRedux.IReduxAction
) {
    switch (action.type) {
        case DateActionType.UPDATE_CURRENT_DATA:
            return { ...state, ...action.payload };
        case DateActionType.INIT_CALEVTDEFINER:
            return { ...state, ...action.payload };
        default:
            return state;
    }
}
