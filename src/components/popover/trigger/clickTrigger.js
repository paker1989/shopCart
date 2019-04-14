import React from 'react';
import Trigger from './trigger';

class ClickTrigger extends Trigger {

  onTriggerProps() {
    return {
      onClick: () => {
        this.props.open();
      }
    }
  }

  bindEventHandler() {
    const { contentVisible } = this.props;
    
    if (contentVisible) {
      window.addEventListener('click', this.props.isClickOutSide);
    } else {
      window.removeEventListener('click', this.props.isClickOutSide);
    }
  }

  componentDidMount() {
    this.bindEventHandler();
  }

  componentDidUpdate() {
    this.bindEventHandler();
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.props.isClickOutSide);
  }

}

export default ClickTrigger;