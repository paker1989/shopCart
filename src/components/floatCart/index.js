import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';

import { loadCarts } from '../../store/actions/floatCarts';
import CardProduct from './cardProduct';

import './floatCart.scss';

class FloatCart extends React.Component {

  state = { isFadeout: true };

  componentDidMount() {
   this.props.loadCarts();
  }

  toggleFloatCart = () => {
    this.setState((state) => ({ isFadeout: !state.isFadeout}))
  }

  render() {
    const container_classes = ["float-cart-container"];

    if (this.state.isFadeout) {
      container_classes.push('fadeOut');
    }

    return (
      <div className={container_classes.join(' ')}>
        <div className="toggle-close" onClick={this.toggleFloatCart}>
          x
        </div>
        <div className="header">
           <span className="icon">
             <span className="bag_quantity">6</span>
           </span>
           <span className="title">Bag</span>
        </div>
        <div className="product-list">
          <CardProduct />
        </div>
        <div className="total">

        </div>
        <div className="checkout">
          <span>CHECKOUT</span>
        </div>
      </div>
    );
  }
}

FloatCart.prototypes = {
  loadCarts: propTypes.func.isRequired,
  addProduct: propTypes.func.isRequired,
  removeProduct: propTypes.func.isRequired,
  cardProduct: propTypes.array.isRequired 
}

const mapStatsToProps = state => {

}


export default connect(mapStatsToProps, { loadCarts })(FloatCart);