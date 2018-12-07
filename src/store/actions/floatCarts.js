import { LOAD_CARTS, ADD_CARTS, UPDATE_CARTS } from './type';

const persistCart = () => {
  const key = 'cardProducts';

  return {
    persistCarts: (data) => {
      localStorage.setItem(key, JSON.stringify(data));
    },
    get: () => {
      // localStorage.setItem(key, JSON.stringify([]));
      return JSON.parse(localStorage.getItem(key))
    }
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

export const addProduct = (product) => dispatch => {
  dispatch({
    type: ADD_CARTS,
    payload: product
  })
}

export const updateCarts = (cardProducts) => dispatch => {
  console.log('update carts')
  persistCart().persistCarts(cardProducts);
  
  const cardTotalInfo = {
    totalPrice: cardProducts.reduce((sum, p) => (sum += p.price), 0),
    totalQuantities: cardProducts.reduce((totalNb, p) => (totalNb += Number(p.quantity)), 0),
    installments: cardProducts.reduce((greater, p) => (p.installments > greater ? 
      p.installments : greater), 0),
    currencyId: 'USD',
    currencyFormat: '$',
  }

  if (!!cardProducts) {
    dispatch({
      type: UPDATE_CARTS,
      payload: cardTotalInfo
    })
  }

}