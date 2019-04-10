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

//re-test
const routes = [
  {
    path: '/index',
    component: Root,
    loadData: () => getSomeData()
  }
]

const APP = () => {
  <Switch>
    {
      routes.map((route) => (
        <Route {...route} />
      ))
    }
  </Switch>
}