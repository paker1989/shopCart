import React from 'react';
import propTypes from 'prop-types';

class Trigger extends React.Component {
   static propTypes = {
    triggerVisibleChange: propTypes.func.isRequired
   }

   constructor(props) {
     super(props);
   }

   onTriggerProps() {}

   render() {
     return (
       <div {...this.onTriggerProps()}>
         {this.props.children}
       </div>
     );
   }
}

export default Trigger;