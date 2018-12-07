import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';

import { loadCarts, updateCarts } from '../../store/actions/floatCarts';
import CardProduct from './cardProduct';

import utils from '../../utils';

import './floatCart.scss';

class FloatCart extends React.Component {

  state = { isFadeout: false };

  componentWillMount() {
   this.props.loadCarts();
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.isInitial) {
      this.onFloatCart(true);
    }
  }

  toggleFloatCart = () => {
    this.setState((state) => ({ isFadeout: !state.isFadeout}));
  }

  onFloatCart = (showStatus) => {
    this.setState(() => ({ isFadeout: showStatus}));
  }

  render() {
    const { cardProducts, totalPrice, totalQuantities, installments, 
            currencyId, currencyFormat } = this.props;
    const container_classes = ["float-cart-container"];
    const formattedTotalPrice = utils.formatPrice(totalPrice, currencyId);

    if (this.state.isFadeout) {
      container_classes.push('fadeOut');
    }

    const p = (
      cardProducts.map(cart => {
        return <CardProduct product={cart} key={cart.id}/>
      })
    )

    const subtotal = (
      <div className="subtotal">
        <span>SUBTOTAL</span>
        <div className="total__detail">
          <label className="total_price">
            <span className="total_price__currency">{currencyId}</span>
            <span>{formattedTotalPrice}</span>
          </label>
          <span className="total__installment">
            OR UP TO {installments} x $ 4.48
          </span>
        </div>
      </div>
    );

    return (
      <div className={container_classes.join(' ')}>
        <div className="toggle-close" onClick={this.toggleFloatCart}>
          x
        </div>
        <div className="header">
           <span className="icon">
             <span className="bag_quantity">{totalQuantities}</span>
           </span>
           <span className="title">Bag</span>
        </div>
        <div className="product-list">
          {p}
        </div>
        {cardProducts.length > 0 && subtotal}
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
  cardProducts: propTypes.array.isRequired 
}

const mapStatsToProps = state => ({
  cardProducts: state.floatCarts.items,
  isInitial: state.floatCarts.info.isInitial,
  totalPrice: state.floatCarts.info.totalPrice,
  totalQuantities: state.floatCarts.info.totalQuantities,
  installments: state.floatCarts.info.installments,
  currencyId: state.floatCarts.info.currencyId,  
  currencyFormat: state.floatCarts.info.currencyFormat,   
})


export default connect(mapStatsToProps, { loadCarts, updateCarts })(FloatCart);