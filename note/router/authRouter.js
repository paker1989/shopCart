import React from 'react';
import { BrowserRouter as Router, Route, Link, Redirect, withRouter } from 'react-router-dom';

const AuthRouter = () => (

  <Router>
    <div>
      <AuthButton />
      <ul>
        <li><Link to="/public">Public Page</Link></li>
        <li><Link to="/protected">Protected Page</Link></li>
      </ul>
      <hr/>

      <Route exact path="/public" component={Public}/>
      <PrivateRoute path="/protected" component={Protected}/>
      <Route path="/login" component={Login}/>
    </div>
  </Router>
);

const Public = () => <div>Public</div>

const Protected = () => <div>Protected</div>

const fakeAuth = {
  isAuthenticated: false,
  logIn(cb) {
    this.isAuthenticated = true,
    cb && setTimeout(() => {
      cb();
    }, 0);
  },
  logOut(cb) {
    this.isAuthenticated = false,
    cb && setTimeout(() => {
      cb();
    }, 0);
  },
}

const AuthButton =withRouter(({ history }) => 
      fakeAuth.isAuthenticated ? (
        <p>
          <span>Welcome!</span>
          <button onClick={() => fakeAuth.logOut(() => history.push("/public"))}>Sign out</button>
        </p>
      ): (<span>You are not logged in.</span>)
  );

const PrivateRoute = ({component: Component, ...restProps}) => {
  return (    
    <Route 
      {...restProps}
      render={(props) => {
        // console.log(props);
        return fakeAuth.isAuthenticated ? 
        (<Component {...props}/>) :
        <Redirect to={{
          pathname: '/login',
          state: { from: props.location}
        }}/>
      }}
    />
  )
}

class Login extends React.Component {
  state = {redirectToReferer: false};

  login = () => {
    fakeAuth.logIn(() => {
      this.setState({redirectToReferer: true});
    });
  }

  render() {
    let { from } = this.props.location.state || { from: { pathname: '/public' }};
    let { redirectToReferer } = this.state;

    return (
      redirectToReferer ? 
        <Redirect to={from}/> :
        <div>
          <p>You must log in to view the page at /protected</p>
          <button onClick={() => this.login()}>Log in</button>
        </div>     
    );
  }
}

export default AuthRouter;