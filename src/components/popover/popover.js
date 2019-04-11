import React, { Children } from 'react';
import propTypes from 'prop-types';

import Trigger from './trigger/trigger';
import Content from './content';
import Placement from './placement';
import kindOf from '../../utils/kindOf';


class Popover extends React.Component {

  static propTypes = {
    isVisible: propTypes.bool,
    position: propTypes.func,
    cushion: propTypes.number,
    containerSelector: propTypes.string
  }

  static defaultProps = {
    cushion: 0,
    position: Placement.belowRight,
    containerSelector: 'body'
  }

  constructor(props) {
    super(props);
  }

  validChildren() {
    const { children } = this.props,
          childrenArray = Children.toArray(children);
    
    if (childrenArray.length !== 2) {
      throw new Error('you must have one trigger element and one content element');
    }

    const { trigger, content } = childrenArray.reduce((state, c) => {
      if (kindOf(c.type, Trigger)) {
        state.trigger = c;
      } else if (kindOf(c.type, Content)) {
        state.content = c;
      }
      return state;
    }, {trigger: null, content: null});

    if (!trigger) {
      throw new Error('you must have one and only one Trigger element');
    }
    if (!content) {
      throw new Error('you must have one and only one Content element');
    }
    return { trigger, content };
  }

  render() {
    const { trigger, content } = this.validChildren();
    return (
      <div>
        {React.cloneElement(trigger, {
          open: function() {console.log('set as visible')}
        })}
        {React.cloneElement(content, {
          open: function() {console.log('set as visible')}
        })}
      </div>
    );
  }
}

export default Popover;