import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

export default class TransitionGroup extends React.Component {
  state = {
    items: [
      { id: uuid(), text: 'Buy eggs' },
      { id: uuid(), text: 'Pay bills' },
      { id: uuid(), text: 'Invite friends over' },
      { id: uuid(), text: 'Fix the TV' },
    ],
  }
  render() {
    const { items } = this.state;

    return (
      <TransitionGroup>
        {
          items.map(({ id, text}) => {
            return (
              <CSSTransition
                key={id}
                classNames="fade"
                timeout="300"
              >
                {text}
              </CSSTransition>
            );
          })
        }
      </TransitionGroup>
    );
  }
}