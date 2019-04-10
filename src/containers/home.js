import React from 'react';

import Shelf from '../components/shelf';
import FloatCart from '../components/floatCart';
import './home.scss';

class Home extends React.Component {

  render() {
    return (
        <div>
          <main>
            <Shelf/>
          </main>
          <FloatCart />
        </div>
    );
  }
}

export default Home;