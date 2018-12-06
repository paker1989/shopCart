import React from 'react';

import utils  from '../../utils';

const demoProduct = {
  "id": 12,
  "sku": 12064273040195392,
  "title": "Cat Tee Black T-Shirt",
  "description": "4 MSL",
  "availableSizes": ["S", "XS"],
  "style": "Black with custom print",
  "price": 10.9,
  "installments": 9,
  "currencyId": "USD",
  "currencyFormat": "$",
  "isFreeShipping": true
}

class CardProduct extends React.Component {
  render() {
    const { price, currencyId, currencyFormat } = demoProduct;
    const formattedPrice = utils.formatPrice(price, currencyId);
  
    return (
      <div className="card-product">
        <div className="product_info">
          <img 
            src={require(`../../../data/static/products/${demoProduct.sku}_2.jpg`)}
            alt={demoProduct.title}>
          </img>
          <div className="description">
            <span className="title">{demoProduct.title}</span>
            <span className="style">{demoProduct.style}</span>
            <span className="quantity">1</span>
          </div>
        </div>
        <div className="product_price">
           <span className="format">{currencyFormat}</span>
           <span>{formattedPrice}</span>
        </div>
      </div>
    );
  }
}

export default CardProduct;