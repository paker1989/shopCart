import { LOAD_CARTS } from '../actions/type';


const initialState = {
  items: [],
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOAD_CARTS:
      return {
        ...state,
        items: action.payload
      };
    default:
      return state;
  }
}