import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import {BrowserRouter as Router, Link, Route } from 'react-router-dom';
import './router.scss';

const bgs = [
  {title: 'Red', value: '/hsl/10/90/50'},
  {title: 'Green', value: '/hsl/120/100/40'},
  {title: 'Blue', value: '/rgb/33/150/243'},
  {title: 'Pink', value: '/rgb/240/98/146'},
]

const AnimationRouter = () => {
  return (
    <Router>
      <Route render={({ location }) => {
        return (
          <div>
            <ul>
              <Route render={() => {
                return bgs.map( (item, i) => {
                  return (
                    <li key={i}>
                      <Link to={item.value}>{item.title}</Link>
                    </li>
                  );
                })
              }}/>
            </ul>
          
            <TransitionGroup>
                <CSSTransition
                  key={location.key}
                  timeout="300"
                  classNames="fade"
                  unmountOnExit
                >
                  <Route exact path="/:format/:h/:s/:l" render={({ match  }) => {
                      const { format, h, s, l } = match.params;
                      const backgroundColor = format === 'hsl'? 
                        `hsl(${h}, ${s}%, ${l}%)`:
                        `rgb(${h}, ${s}, ${l})`;
                      return (
                        <div className ="animation-container" style={ {backgroundColor} }>
                          {backgroundColor}
                        </div>
                      )
                    }}/>      
                </CSSTransition>
            </TransitionGroup>
          </div>
        );
      }}/>
    </Router>
  );
}

export default AnimationRouter;