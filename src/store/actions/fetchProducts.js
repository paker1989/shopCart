import axios from 'axios';
import { FETCH_PRODUCTS } from './type';

const productsAPI = "https://react-shopping-cart-67954.firebaseio.com/products.json";
const localAPI = "/static/products.json";

export default (filters, sort, callback) => dispatch => {
  axios.get(productsAPI, {
  }).then(res => {
    const { products } = res.data;

    if (!!filters) {
      //do something
    }

    if (!!sort) {
      //do something
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

