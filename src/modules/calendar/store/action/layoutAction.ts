import * as LayoutActionType from '../actionType/layoutActionType';
import { CalendarRedux } from '../../utils/reduxTypes';
import { CalendarNS } from '../../utils/types';

// export const updateLayout = (layout: string): CalendarRedux.IReduxAction => ({
//     type: LayoutActionType.UPDATE_CURRENT_LAYOUT,
//     payload: { layout },
// });

export const changeLang = (locale: string): CalendarRedux.IReduxAction => ({
    type: LayoutActionType.CHANGE_LOCALE,
    payload: { locale },
});

export const updateDayEvtPresenterOptions = (
    show: boolean,
    options: CalendarNS.ICalEventPresenterProps
): CalendarRedux.IReduxAction => ({
    type: LayoutActionType.UPDATE_DAYEVTPRESENTER_OPTION,
    payload: {
        dayEvtPresenterOptions: {
            show,
            options,
        },
    },
});
