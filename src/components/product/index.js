import React from 'react';
import './product.scss';

class Product extends React.Component {
  render() {
    const product = this.props.product;

    return (
      <div className="product">
        <div className="freeship">Free Shipping</div>
        <div className="product-content">
          <img src={require(`../../../data/static/products/${product.sku}_1.jpg`)}
             alt={product.title}>
          </img>
          <span className="title">{product.title}</span>
          <div className="price">
            todo
          </div>
          <div className="product-action">
            Add to cart
          </div>
        </div>
      </div>
    );
  }
}

export default Product;

/**
 * 
 */