import React from 'react';

import './filter.scss';
import Checkbox from './checkbox';
import { connect } from 'react-redux';
import updateFilters from '../../store/actions/updateFilter';


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
  
  componentDidMount() {
    this.selectedFilters = new Set();
  }

  toggleFilterChange = (label) => {
    if (this.selectedFilters.has(label)) {
      this.selectedFilters.delete(label);
    } else {
      this.selectedFilters.add(label);
    }
    this.props.updateFilters(Array.from(this.selectedFilters));
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

export default connect(() => {return {}}, { updateFilters })(Filter);