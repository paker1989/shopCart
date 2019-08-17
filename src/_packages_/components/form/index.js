import React from 'react';
import CustomInput from './input';

const form = () => {
  const onSubmit = (e) => {
    console.log(e);
  }

  return (
    <form onSubmit={onSubmit}>
      <CustomInput name="demo" defaultValue="default demo"/>
    </form>
  );
}

export default form;