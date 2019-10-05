import * as EvtsActionType from '../actionType/evtsActionType';

export const fetchEvts = (date: Date) => ({
    type: EvtsActionType._FETCH_EVTS,
    date,
});
