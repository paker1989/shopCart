import React from 'react';
import { Provider } from 'react-redux';
import store from '../store';

import Shelf from '../components/shelf';
import './App.scss';

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <main className="shelf-container">
          <Shelf />
        </main>
      </Provider>
    );
  }
}

export default App;