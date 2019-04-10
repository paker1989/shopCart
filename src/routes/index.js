import React from 'react'
import Home from '../containers/home';
import Popover from '../components/popover';
import { Route, Switch } from 'react-router-dom';

const routeProps = [
  {path: '/', component: Home, exact: true, id: 1},
  {path: '/popover', component: Popover, id: 2}
]

const routes = (
  <Switch>
    {routeProps.map(route => (<Route key={route.id} {...route}/>))}
  </Switch>
);

export default routes;