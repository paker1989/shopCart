import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(< App />, document.getElementById('root'));

console.log(process.env.NODE_ENV);

if (module.hot && process.env.NODE_ENV === 'development') {
  module.hot.accept();
}