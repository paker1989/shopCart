import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './shelf.scss';

import fetchProducts from '../../store/actions/fetchProducts';
import Filter from '../filter';
import Product from '../product';

/**
 * composed with filter at left, product container at right, product container
 * composed with shelf header above and products 
 */
class Shelf extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loading: false };
  }

  componentWillMount() {
    const { filters, sort } = this.props;
    this.handleFetchProducts(filters, sort);
  }

  handleFetchProducts(filters = this.props.filters, sort = this.props.sort) {
    this.setState({ loading: true });

    this.props.fetchProducts(filters, sort, () => {
      this.setState({ loading: false });
    })
  }

  render() {

    return (
      <React.Fragment>
        <Filter />
      </React.Fragment>
    );
  }
}

Shelf.prototypes = {
  fetchProducts: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  products: state.products.items,
  filters: state.filters.item,
  sort: state.sort.item,
})


export default connect(mapStateToProps, { fetchProducts })(Shelf);