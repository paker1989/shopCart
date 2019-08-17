import React, { Component } from 'react';
import Proptypes from 'prop-types';

// class Input extends Component {
//   render() {

//   }
// }

const CustomInput = (props) => {
  const { name, defaultValue } = props;
  return (    
    <input 
      name={name}
      defaultValue={defaultValue}
     />
  );
}

CustomInput.prototype = {
  name: Proptypes.string,
  defaultValue: Proptypes.string
};

export default CustomInput;