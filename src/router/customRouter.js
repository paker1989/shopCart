import React from 'react';
import { BrowserRouter as Router, Route, Link, Redirect, withRouter } from 'react-router-dom';

const CustoRouter = () => {
  return (
    <Router>
      <div>
        <OldSchoolLink exact="true" to="/" label="Home"/>
        <OldSchoolLink to="/About" label="About"/>
        <hr/>
        <Route exact path="/" component={Home}/>
        <Route path="/About" component={About}/>
      </div>
    </Router>
  );
};

const OldSchoolLink = ({ to, exact, label }) => {
  return (
    <Route
      path={to}
      exact={exact}
      children={({ match }) => (
        <div className={match ? "active": ""}>
          {match? "> ": ""}
          <Link to={to}>{label}</Link>
        </div>
      )}
    />
  );
}

const Home = () => <div>Home</div>;
const About = () => <div>About</div>

export default CustoRouter;