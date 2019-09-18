import * as LayoutActionType from '../actionType/layoutActionType';
import { CalendarRedux } from '../../utils/reduxTypes';

export const updateLayout = (layout: string): CalendarRedux.IReduxAction => ({
    type: LayoutActionType.UPDATE_CURRENT_LAYOUT,
    payload: { layout },
});
