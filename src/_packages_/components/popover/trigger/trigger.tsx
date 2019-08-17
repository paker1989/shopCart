import * as React from 'react';
import { Children } from 'react';
import isFunction from 'lodash/isFunction';

export interface IClickTriggerProps {
  triggerRefChange?: (node: any) => void;
  contentVisible: boolean;
  isClickOutSide: (...options) => void;
  open?: () => void;
  close?: () => void;
}

class Trigger extends React.Component<IClickTriggerProps, any> {
   constructor(props) {
     super(props);
   }

   onTriggerProps(child?: JSX.Element) {
    return {};
  }
  //  onTriggerProps: () => object;

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

     const child: any = Children.only(this.props.children);
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