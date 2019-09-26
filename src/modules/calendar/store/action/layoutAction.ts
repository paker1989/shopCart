import * as LayoutActionType from '../actionType/layoutActionType';
import { CalendarRedux } from '../../utils/reduxTypes';

export const changeLang = (locale: string): CalendarRedux.IReduxAction => ({
    type: LayoutActionType.CHANGE_LOCALE,
    payload: { locale },
});
