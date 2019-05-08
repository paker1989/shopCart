import React from 'react'
import { Route, Switch } from 'react-router-dom';

import Home from '../containers/home';
import PopoverDemo from '../containers/popoverDemo';
import Layout from '../containers/layout';
import InfiniteScroller from '../containers/infiniteScroller';
import Picker from '../containers/Picker';

const routeProps = [
  {path: '/', component: Home, exact: true, id: 1},
  {path: '/popover', component: PopoverDemo, id: 2},
  {path: '/layout', component: Layout, id: 3},
  {path: '/scroller', component: InfiniteScroller, id: 4},
  {path: '/picker', component: Picker, id: 5}
]

const routes = (
  <Switch>
    {routeProps.map(route => (<Route key={route.id} {...route}/>))}
  </Switch>
);

export default routes;