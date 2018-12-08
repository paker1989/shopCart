import React from 'react';

import utils  from '../../utils';
import './cardProduct.scss';

class CardProduct extends React.Component {

  render() {
    const { id, price, currencyId, currencyFormat, sku, title, style, quantity } = this.props.product;
    const formattedPrice = utils.formatPrice(price * quantity, currencyId);

    return (
      <div className="card-product" onClick={() => this.props.removeProduct(id)}>
        <div className="delete-card">x</div>
        <div className="product_info">
          <div className = "product_info__img">
            <img
              src={require(`../../../data/static/products/${sku}_2.jpg`)}
              alt={title}>
            </img>            
          </div>
          <div className="description">
            <span className="title">{title}</span>
            <span className="style">{style}</span>
            <span className="quantity">Quantity: {quantity}</span>
          </div>
        </div>
        <div className="product_price">
           <span>{currencyFormat} {formattedPrice}</span>
        </div>
      </div>
    );
  }
}

export default CardProduct;