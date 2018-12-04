import axios from 'axios';
import { FETCH_PRODUCTS } from './type';

const productsAPI = "https://react-shopping-cart-67954.firebaseio.com/products.json";
const localAPI = "/static/products.json";

export default (filters, sort, callback) => dispatch => {
  axios.get(productsAPI, {
  }).then(res => {
    let { products } = res.data;

    if (!!filters) {
      if (filters.length > 0) {
        products = products.filter(p => p.availableSizes.find(size => filters.includes(size)));
      }
    }

    if (!!sort) {
      products = products.sort((a, b) => {
        switch(sort) {
          case 'ltoh': return (b.price - a.price);
          case 'htol': return (a.price - b.price);
          default: return 0;
        }
      })
    }

    if (!!callback) {
      callback();
    }

    return dispatch({
      type: FETCH_PRODUCTS,
      payload: products
    })
  })
  .catch(error => {
    console.log(error);
    throw new Error('cannot fetch products, please try later.');
  })
}

