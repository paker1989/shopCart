import { UPDATE_CARTS, LOAD_CARTS } from '../actions/type';


const initialState = {
  info: {
    totalPrice: 0,
    totalQuantities: 0,
    installments: 0,
    currencyId: 'USD',
    currencyFormat: '$',
    isInitial: true
  },
  items: [],
};

const loadInfo = (state, action) => {
  const { cards, ...totalInfo } = action.payload;
  return {
    ...state,
    items: cards,
    info: Object.assign({}, totalInfo)
  }   
}

export default function(state = initialState, action) {
  switch (action.type) {
    case LOAD_CARTS:
      return loadInfo(state, action);
    case UPDATE_CARTS:
      return loadInfo(state, action);
    default:
      return state;
  }
}