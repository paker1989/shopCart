import { UPDATE_CARTS, LOAD_CARTS } from './type';

function loadProductInfo (cards, isInitial) {
  return {
    totalPrice: cards.reduce((sum, p) => (sum += p.price * p.quantity), 0),
    totalQuantities: cards.reduce((totalNb, p) => (totalNb += Number(p.quantity)), 0),
    installments: cards.reduce((greater, p) => (p.installments > greater ? 
      p.installments : greater), 0),
    currencyId: 'USD',
    currencyFormat: '$',
    cards,
    isInitial
  }
}

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
  const cards = persistCart().get();

  if (!!cards) {
    const cardTotalInfo = loadProductInfo(cards, true);
  
    dispatch({
      type: LOAD_CARTS,
      payload: cardTotalInfo
    })
  }
}

export const addProduct = (product) => dispatch => {
  let isAlreadyAdded = false;
  const cards = persistCart().get();

  cards.forEach((p) => {
    if (p.id === product.id) {
      p.quantity += 1;
      isAlreadyAdded = true;
    }
  })

  if (!isAlreadyAdded) {
    cards.push(Object.assign({}, product, { quantity: 1}));
  }

  persistCart().persistCarts(cards);   

  const cardTotalInfo = loadProductInfo(cards, false);

  dispatch({
    type: UPDATE_CARTS,
    payload: cardTotalInfo
  })
}

export const removeProduct = (id) => dispatch => {
  const { findIndex, splice } =  Array.prototype;
  const cards = persistCart().get();
  const cardToRemoveIndex = findIndex.call(cards, (p) => {
    return p.id === id
  })

  if (cardToRemoveIndex > -1) {
    splice.call(cards, cardToRemoveIndex, 1);
  }

  persistCart().persistCarts(cards);   

  const cardTotalInfo = loadProductInfo(cards, false);

  dispatch({
    type: UPDATE_CARTS,
    payload: cardTotalInfo
  }) 
}