import * as LayoutActionType from '../actionType/layoutActionType';
import { CalendarRedux } from '../../utils/reduxTypes';
import calConfig from '../../assets/scripts/calendar.config';

const initialState = { locale: calConfig.defaultLocale };


export default function(
    state = initialState,
    action: CalendarRedux.IReduxAction
) {
    switch (action.type) {
        case LayoutActionType.UPDATE_CURRENT_LAYOUT:
            return { ...state, ...action.payload };
        case LayoutActionType.CHANGE_LOCALE:
            return { ...state, ...action.payload };
        default:
            return state;
    }
}
