import * as LayoutActionType from '../actionType/layoutActionType';
import { CalendarRedux } from '../../utils/reduxTypes';
import calConfig from '../../assets/scripts/calendar.config';

const initialState = {
    locale: calConfig.defaultLocale,
    dayEvtPresenterOptions: {
        show: false,
        options: {},
    },
};

export default function(
    state = initialState,
    action: CalendarRedux.IReduxAction
) {
    switch (action.type) {
        case LayoutActionType.CHANGE_LOCALE:
            return { ...state, ...action.payload };
        case LayoutActionType.UPDATE_DAYEVTPRESENTER_OPTION:
            return { ...state, ...action.payload };
        default:
            return state;
    }
}
