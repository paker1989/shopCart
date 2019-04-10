import { BrowserRouter, Switch, Route, Link, NavLink} from 'react-router-dom';

const Index = () => <div>Index</div>;
const NotFound = () => <div>404</div>;
const WithProps = (props) => <div>{props}</div>

const AppRouter = (
  <BrowserRouter>
    <NavLink to="/index" activeClassName="index-class" />
  </BrowserRouter>

  <Switch>
    <Route path="/index" component={Index} />
    <Route path="/props" render={ props => <WithProps {...props} extra={someVariable} />} />
    <Route component={NotFound}/>
  </Switch>
);

const Index = () => <div>Index</div>
const AppRouter = (
  <div>
    <BrowserRouter>
      <NavLink to="/index" activeClassName="index-class"/>
    </BrowserRouter>

    <Switch>
      <Route path="/index" component={Index}/>
    </Switch>
  </div>
);
