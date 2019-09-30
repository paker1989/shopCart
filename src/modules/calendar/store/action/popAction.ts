import * as PopActionType from '../actionType/popActionType';
import { CalendarRedux } from '../../utils/reduxTypes';

export const updateDefinerPop = (
    definerProps: CalendarRedux.IDefinerPopStats
): CalendarRedux.IReduxAction => ({
    type: PopActionType.UPDATE_DEF_DATA,
    payload: { ...definerProps },
});
