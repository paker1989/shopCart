import { FETCH_PRODUCTS } from '../actions/type';

const initialStates = {
  items: []
}

export default (state = initialStates, action) => {
  switch(action.type) {
    case FETCH_PRODUCTS: 
      return Object.assign({}, state, {items: action.payload});
    default: 
      return state
  }
}