import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Sort from './sort';

class ShelfHeader extends React.Component {
  render() {
    return (
      <div  className="shelf-header">
        <small>
          <span>{this.props.productLength} product(s) found.</span>
        </small>
        <div>
          Order by {<Sort />}
        </div>
      </div>
    );
  }
}

const mapStatsToProps = (state) => ({
  productLength: state.products.items.length
})

ShelfHeader.prototypes = {
  productLength: PropTypes.number.isRequired
}

export default connect(mapStatsToProps)(ShelfHeader);