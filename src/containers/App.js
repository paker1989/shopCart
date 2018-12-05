import React from 'react';
import { Provider } from 'react-redux';
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
            <Shelf/>
          </main>
          <FloatCart />
        </div>
      </Provider>
    );
  }
}

export default App;