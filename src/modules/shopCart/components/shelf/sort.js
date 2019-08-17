import React from 'react';
import { connect } from 'react-redux';
import  updateSort from '../../store/actions/updateSort';

const sortOptions = [
  { value: '', label: 'Select'},
  { value: 'ltoh', label: 'Lowest to highest'},
  { value: 'htol', label: 'Highest to lowest'}
]

class Sort extends React.Component {

  sortProducts = (e) => {
    this.props.updateSort(e.target.value);
  }

  render() {
    const options = sortOptions.map((option) => {
      return <option value={option.value} key={option.value}>{option.label}</option>
    });
    
    return (
        <select name="sort" className="sortbox"  onChange={(e) => this.sortProducts(e)}>
          {options}
        </select>
    );
  }
}

export default connect(() => {return  {}}, { updateSort })(Sort);