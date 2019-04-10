import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

const AppRouter = () => (
  <Router>
    <div>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/topics">topics</Link></li>
        <li><Link to="/nonexist">No match</Link></li>
      </ul>
      <hr/>

      <Route exact path="/" component={Home}/>
      <Route path="/about" component={About}/>
      <Route path="/topics" component={Topics}/>
      <Route render={({ location }) => {
        return (
          <div>No match for {location.pathname}</div>
        );

      }}/>
    </div>
  </Router>
);

const Home = () => <div>Home</div>
const About = () => <div>About</div>

const Topics = ({ match }) => {
  return (
    <div className="topics">
      <h3>Topics</h3>
      <ul>
        <li><Link to={`${match.url}/rendering`}>Rendering with React</Link></li>
        <li><Link to={`${match.url}/components`}>Components</Link></li>
      </ul>

      <Route path={`${match.url}/:topicId`} component={topic}/>
    </div>
  );
}

const topic = ({ match }) => {
  return (
    <div>{match.params.topicId}</div>
  );
}

export default AppRouter;