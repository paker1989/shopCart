import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';

import { loadCarts, updateCarts } from '../../store/actions/floatCarts';
import CardProduct from './cardProduct';

import './floatCart.scss';

class FloatCart extends React.Component {

  state = { isFadeout: true };

  componentWillMount() {
   this.props.loadCarts();
  }

  componentDidMount() {
    setTimeout(() => {
      this.props.updateCarts(this.props.cardProducts);
    }, 0);
  }

  componentWillReceiveProps(nextProps) {
    // console.log('receive props')
    // console.log(nextProps)
    let isAlreadyAdded = false;
    const { cardProducts, newProduct, updateCarts } = nextProps;
    if (newProduct === undefined || nextProps.newProduct === this.props.newProduct) return;

    cardProducts.forEach(p => {
      if (p.id === newProduct.id) {
        isAlreadyAdded = true;
        p.quantity += 1;
      }
    })

    if (isAlreadyAdded == false) {
      cardProducts.push(Object.assign({}, newProduct, {quantity: 1}));
    }

    updateCarts(cardProducts);
  }

  toggleFloatCart = () => {
    this.setState((state) => ({ isFadeout: !state.isFadeout}))
  }

  render() {
    // console.log(this.props);
    const { cardProducts, totalPrice, totalQuantities, installments, 
            currencyId, currencyFormat } = this.props;
    const container_classes = ["float-cart-container"];

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
            <span>{totalPrice}</span>
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
  newProduct: state.floatCarts.newItem,
  cardProducts: state.floatCarts.items,
  totalPrice: state.floatCarts.info.totalPrice,
  totalQuantities: state.floatCarts.info.totalQuantities,
  installments: state.floatCarts.info.installments,
  currencyId: state.floatCarts.info.currencyId,  
  currencyFormat: state.floatCarts.info.currencyFormat,   
})


export default connect(mapStatsToProps, { loadCarts, updateCarts })(FloatCart);