import React from 'react';

import Checkbox from './checkbox';

const availableSizes = [
  'XS',
  'S',
  'M',
  'ML',
  'L',
  'XL',
  'XXL',
]

class Filter extends React.Component {
  
  componentWillMount() {
    this.selectedFilters = new Set();
  }

  createCheckbox(label) {
    return (
      <Checkbox 
        label={label}
        onClick={this.toggleFilterChange}
        key={label}
      />
    );
  }

  render() {
    const checkboxs = availableSizes.map(size => {
      return this.createCheckbox(size);
    })

    return (
      <section className="filter-container">
        <h4 className="title">Sizes:</h4>
        <div className="filters">
          {checkboxs}
        </div>
      </section>
    );
  }
}

export default Filter;