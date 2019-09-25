import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './shelf.scss';

import fetchProducts from '../../store/actions/fetchProducts';
import Filter from '../filter';
import Product from '../product';
import ShelfHeader from './shelfHeader';
import Spinner from '@component/spinner';


/**
 * composed with filter at left, product container at right, product container
 * composed with shelf header above and products 
 */
class Shelf extends React.Component {

  state = { loading: false };

  componentDidMount() {
    this.handleFetchProducts(filters, sort);
    const { filters, sort } = this.props;
  }

  componentDidUpdate(prevProps) {
    const { filters, sort } = prevProps;
    if (this.props.filters !== filters || this.props.sort !== sort) {
      this.handleFetchProducts(this.props.filters, this.props.sort );
    }
  }

  handleFetchProducts(filters = this.props.filters, sort = this.props.sort) {
    this.setState({ loading: true });

    this.props.fetchProducts(filters, sort, () => {
      this.setState({ loading: false });
    })
  }

  render() {
    const p = this.props.products.map((p) => {
      return (
        <Product 
          key={p.id}
          product={p}
          // addProduct={this.props.addProduct}
          />
      );
    })

    return (
      <div className="shelf">
       {this.state.loading &&
         <Spinner />
       }
        <Filter />
        <div className="shelf-content-container">
          {<ShelfHeader/>}
          <div className="products-wraper">{p}</div>
        </div>
      </div>
    );
  }
}

Shelf.prototypes = {
  fetchProducts: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  products: state.products.items,
  filters: state.filters.items,
  sort: state.sort.item,
})


export default connect(mapStateToProps, { fetchProducts })(Shelf);