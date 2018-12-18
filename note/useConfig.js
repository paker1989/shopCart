import { BrowserRouter, Switch, Route, Link, NavLink} from 'react-router-dom';
import Routes from './config';

const App = () => {
  <Switch>
    {
      Routes.map(route => (
        <Route {...route} />
      ))
    }
  </Switch>
}