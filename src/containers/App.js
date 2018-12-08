import React from 'react';
import { Provider } from 'react-redux';
import store from '../store';

import Shelf from '../components/shelf';
import FloatCart from '../components/floatCart';
import './App.scss';

class App extends React.Component {

  checkClickOutsideFloatCart = (e) => {
    
  }

  render() {
    return (
      <Provider store={store}>
        <div onClick={(e) => this.checkClickOutsideFloatCart(e)}>
          <main>
            <Shelf/>
          </main>
          <FloatCart />
        </div>
      </Provider>
    );
  }
}

export default App;