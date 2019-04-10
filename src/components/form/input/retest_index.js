import React from 'react';
import Proptypes from 'prop-types';

const CustomInput = ({ placeholder, handleChange }) => {
  return (
    <input type="text" 
           placeholder={placeholder ? placeholder: 'type something...'}
           onChange={(e) => handleChange(e.target.value)}
    />
  );
}

const handleChange = (value) => {
  console.log('handle change: ' + value);
}
ReactDOM.render(
  <CustomInput handleChange={handleChange} />,
  document.getElementById('root')
);