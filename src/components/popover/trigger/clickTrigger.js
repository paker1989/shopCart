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
}

export default ClickTrigger;