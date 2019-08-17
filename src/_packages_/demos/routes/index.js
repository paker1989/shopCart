import React from 'react'
import { Route, Switch } from 'react-router-dom';

import Home from '../components/demos/containers/home';
import PopoverDemo from '../components/demos/containers/popoverDemo';
import Layout from '../components/demos/containers/layout';
import InfiniteScroller from '../components/demos/containers/infiniteScroller';
import Picker from '../components/demos/containers/Picker';

import Demo from '../site';

const routeProps = [
  {path: '/', component: Demo, exact: true, id: 1},
  {path: '/popover', component: PopoverDemo, id: 2},
  {path: '/layout', component: Layout, id: 3},
  {path: '/scroller', component: InfiniteScroller, id: 4},
  {path: '/picker', component: Picker, id: 5},
  {path: '/home', component: Home, id: 6},
]

const routes = (
  <Switch>
    {routeProps.map(route => (<Route key={route.id} {...route}/>))}
  </Switch>
);

export default routes;