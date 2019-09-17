import { } from '../action/type';
import { CalendarNS } from '../../utils/types';

const initialState = {
  currentDate: new Date(),
  currentWeek: 1,
};

export default function(state = initialState, action: CalendarNS.IReduxAction) {
  switch (action.type) {
    default:
      return state;
  }
}
