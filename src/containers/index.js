import React from 'react';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, browserHistory, Link } from 'react-router-dom';

class App extends React.Component {

  static propTypes = {
    store: PropTypes.object.isRequired,
    routes: PropTypes.object.isRequired
  }

  render() {
    const { store, routes } = this.props;

    return (
      <Provider store={store}>
          <div>
            <Router history={browserHistory}>
              {routes}
            </Router>
          </div>
      </Provider>
    );
  }
}

export default App;