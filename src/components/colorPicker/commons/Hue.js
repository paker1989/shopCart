import React from 'react';

import throttle from 'lodash/throttle';

class Hue extends React.Component {
  constructor(props) {
    super(props);
    this.containerNef = React.createRef();
  }

  handleChange = throttle(() => {
    
  })

  render() {
    const { prefix } = this.props;

    return (
      <div ref={this.containerNef} className={`${prefix}-hue-area`}>
        
      </div>
    );
  }
}

export default Hue;