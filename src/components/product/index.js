import React from 'react';
import './product.scss';
import util from '../../utils';

import { connect } from 'react-redux';
import { addProduct } from '../../store/actions/floatCarts';

class Product extends React.Component {
  render() {
    const product = this.props.product;
    const formattedPrice = util.formatPrice(product.price, product.currencyId);

    const productInstallment = (
      <div className="installment">
        or {product.installments} x {product.currencyFormat} {util.formatPrice(product
          .price/product.installments, product.currencyId)}
      </div>
    );
    
    return (
      <div className="product">
        <div className="freeship">Free Shipping</div>
        <div className="product-content">
          <img src={require(`../../../data/static/products/${product.sku}_1.jpg`)}
             alt={product.title}>
          </img>
          <span className="title">{product.title}</span>
          <div className="price">
            <div className="price_self">
              <small>{product.currencyFormat}</small>
              <b>{formattedPrice.substring(0, formattedPrice.length - 3)}</b>
              {formattedPrice.substring(formattedPrice.length - 3)}
            </div>
            {productInstallment}
          </div>
          <div className="product-action" onClick={() => this.props.addProduct(product)}>
            Add to cart
          </div>
        </div>
      </div>
    );
  }
}

export default connect((state) => ({}), { addProduct })(Product);

/**
 * 
 */