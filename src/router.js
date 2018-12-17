import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import Form from './components/form';
// import AppComponent from './containers/App';

// const Demo = () => <h2>Home</h2>;
// const App = () => AppComponent;

const AppRouter = () => (
  <Router>
    <div>
      <nav>
        <ul>
          <li>
            {/* <Link to="/demo">Demo</Link> */}
            <Link to="/form">Form</Link>
          </li>
        </ul>
      </nav>

      <Route path="/form" component={Form} />
      {/* <Route path="/app" component={App} /> */}
    </div>
  </Router>

);

export default AppRouter;