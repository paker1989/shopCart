import React from 'react';
import './floatCart.scss';

class FloatCart extends React.Component {

  state = { isFadeout: true };

  render() {
    const container_classes = "float-cart-container";
    // this.state.isFadeout && (container_classes =  container_classes +' fadeout');

    return (
      <div className={container_classes}>
        <div className="toggle-close">
          x
        </div>
        <div className="title">

        </div>
        <div className="product-list">

        </div>
        <div className="resume">

        </div>
        <div className="checkout">
          <span>CHECKOUT</span>
        </div>
      </div>
    );
  }
}

export default FloatCart;