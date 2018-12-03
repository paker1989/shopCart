import React from 'react';

import './filter.scss';
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

  toggleFilterChange = (label) => {
    //todo
  }

  createCheckbox(label) {
    return (
      <Checkbox 
        label={label}
        toggleFilterChange={this.toggleFilterChange}
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
        <div className="checkboxs">
          {checkboxs}
        </div>
      </section>
    );
  }
}

export default Filter;