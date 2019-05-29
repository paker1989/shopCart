import React from 'react';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import Site from './site';
import { getFullPath } from './site/addRoute';
import navData from './site/navData';

import ShopCart from './containers/home';

// const demoRouteData = addRoute(navData, '/demo');


class App extends React.Component {

  static propTypes = {
    store: PropTypes.object.isRequired,
  }

  render() {
    const { store } = this.props;

    return (
      <Provider store={store}>
        <Router basename="/">
          <Switch>
            <Route 
              path="/shopCart"
              component={ShopCart}/>
            <Route 
              path="/demo"
              render={({ match, ...routeProps }) => (
                <Site match={match} {...routeProps}>
                  {navData.map((data) => (
                    renderComponent(match, data)
                  ))}
                </Site>
              )}/>
            <Redirect from="*" to="/shopCart" />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

function renderComponent(match, data) {
  const { path, source } = data;
  return (
    <Route key={`route-${path}`} path={getFullPath(match, path)} component={source} />
  );
}

export default App;