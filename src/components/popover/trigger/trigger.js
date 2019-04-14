import React, { Children } from 'react';
import propTypes from 'prop-types';

class Trigger extends React.Component {
   static propTypes = {
    // triggerVisibleChange: propTypes.func.isRequired
     triggerRefChange: propTypes.func,
     contentVisible: propTypes.bool,
     isClickOutSide: propTypes.func
   }

   constructor(props) {
     super(props);
   }

   onTriggerProps() {}

   onRefChange = (instance) => {
     const { triggerRefChange } = this.props;

     triggerRefChange(instance);
   }

   validateChildren() {
     const { children } = this.props;
     const count = Children.count(children);

     if (count === 0) {
       throw new Error('Popover trigger requires a child');
     }

     const childrenType = typeof children;
     if (
       (count === 1 && childrenType === 'string') ||
       childrenType === 'number'
     ) {
       return <span>{children}</span>;
     }

     if (count > 1) {
       throw new Error(
         `Popover trigger requires only one child, but found ${count}`
       );
     }

     const child = Children.only(this.props.children);
     if (child.ref && !isFunction(child.ref)) {
       throw new Error('String ref is not allowed on Popover trigger');
     }

     return child;     
   }

   render() {
     const child = this.validateChildren();

     return (
       React.cloneElement(child, {
         ref: this.onRefChange,
         ...this.onTriggerProps()
       })
     );
   }
}

export default Trigger;