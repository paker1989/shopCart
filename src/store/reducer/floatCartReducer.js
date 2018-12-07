import { LOAD_CARTS, ADD_CARTS, UPDATE_CARTS } from '../actions/type';


const initialState = {
  info: {
    totalPrice: 0,
    totalQuantities: 0,
    installments: 0,
    currencyId: 'USD',
    currencyFormat: '$',    
  },
  items: [],
  newItem: undefined
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOAD_CARTS:
      return {
        ...state,
        items: action.payload
      };
    case ADD_CARTS:
      return {
        ...state,
        newItem: Object.assign({}, action.payload)
      };
    case UPDATE_CARTS:
      return {
        ...state,
        info: Object.assign({}, action.payload)
      }
    default:
      return state;
  }
}