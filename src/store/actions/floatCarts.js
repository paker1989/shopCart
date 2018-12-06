import { LOAD_CARTS } from './type';

const persistCart = () => {
  const key = 'cardProducts';

  return {
    persistCarts: (data) => {
      localStorage.setItem(key, data);
    },
    get: () => localStorage.getItem(key)
  }
}

export const loadCarts = () => dispatch => {
  const cardProducts = persistCart().get();

  if (!!cardProducts) {
    dispatch({
      type: LOAD_CARTS,
      payload: cardProducts
    })
  }
}