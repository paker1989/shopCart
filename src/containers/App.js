import React from 'react';
import { Provider } from 'react-redux';
import Router from '../router/authRouter';

import store from '../store';

import Shelf from '../components/shelf';
import FloatCart from '../components/floatCart';
import './App.scss';

class App extends React.Component {

  render() {
    return (
      <Provider store={store}>
        <div>
          <main>
            <Router />
            <Shelf/>
          </main>
          <FloatCart />
        </div>
      </Provider>
    );
  }
}

export default App;