import React from 'react';

class Checkbox extends React.Component {

  state = { isChecked: false }

  toggleCheckbox = () => {
    const { toggleFilterChange, label } = this.props;

    this.setState((state) => ({ isChecked: !state.isChecked}));
    toggleFilterChange(label);
  }

  render() {
    const { label } = this.props; 
    const { isChecked } = this.state; // is checked

    return (
        <label className="checkbox">
          <input 
            type="checkbox"
            value={label}
            checked={isChecked}
            onChange={this.toggleCheckbox}
          />
          <span className="checkmark">{label}</span>         
        </label>
    );
  }
}

export default Checkbox;