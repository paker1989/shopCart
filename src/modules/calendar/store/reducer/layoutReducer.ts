import * as LayoutActionType from '../actionType/layoutActionType';
import { CalendarRedux } from '../../utils/reduxTypes';

const initialState = {};

export default function(
    state = initialState,
    action: CalendarRedux.IReduxAction
) {
    switch (action.type) {
        case LayoutActionType.UPDATE_CURRENT_LAYOUT:
            return { ...state, ...action.payload };
        default:
            return state;
    }
}
