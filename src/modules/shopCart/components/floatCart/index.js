import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';

import { loadCarts, updateCarts, removeProduct } from '../../store/actions/floatCarts';
import CardProduct from './cardProduct';
import Modal from '@component/modal'; 
// import ReactModal from 'react-modal';

import utils from '../utils';

import './floatCart.scss';

class FloatCart extends React.Component {

  state = { 
    isFadeout: false,
    checkOut: false,
   };

  componentDidMount() { //should use componentDidMount
   this.props.loadCarts();
  }

  componentDidMount() {
    this.props.loadCarts();
  }

  componentDidUpdate(nextProps) {
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

  removeCard = (id) => {
    this.props.removeProduct(id);
  }

  checkOutTotal = () => {
    this.setState((state) => ({ checkOut: true }));
  }

  closeCheckout = () => {
    console.log('close checkout')
    this.setState((state) => ({ checkOut: false }));
    
  }

  render() {
    const { cardProducts, totalPrice, totalQuantities, installments, 
            currencyId } = this.props;
    const { checkOut } = this.state;
    const container_classes = ["float-cart-container"];
    const formattedTotalPrice = utils.formatPrice(totalPrice, currencyId);

    if (this.state.isFadeout) {
      container_classes.push('fadeOut');
    }

    const icon = (
      <span className="icon">
        <span className="bag_quantity">{totalQuantities}</span>
      </span>
    );

    const closeRender = (
      <div className="toggle-close" onClick={this.toggleFloatCart}>
        {this.state.isFadeout && 'x'}
        {!this.state.isFadeout && icon}
      </div>

    );

    const p = (
      cardProducts.map(cart => {
        return <CardProduct product={cart} key={cart.id} removeProduct={this.removeCard}/>
      })      
    )

    const reminder = (
      <div className="reminder">
        <span>Add some product in the bag</span>
        <span>:)</span>
      </div>
    );

    const content = (
      <div>
        <div className="product-list">
          {p}
        </div>
      </div>
    );

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

    const modal = (
      <Modal 
        layerClass="center-layer"
        contentClass="float-content-modal"
        closeAfterTimeMS="3000"
        onClose={this.closeCheckout}
      >
        <h1>This is modal</h1>
      </Modal>
    );


    return (
      <div className={container_classes.join(' ')}>
        {closeRender}
        <div className="header">
          {icon}
          <span className="title">Bag</span>
        </div>
        {cardProducts.length === 0 && reminder}
        {cardProducts.length > 0 && content}
        {cardProducts.length > 0 && subtotal}
        <div className="checkout" onClick={this.checkOutTotal}>
          <span>CHECKOUT</span>
        </div>
        {checkOut && modal}
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


export default connect(mapStatsToProps, { loadCarts, updateCarts, removeProduct })(FloatCart);