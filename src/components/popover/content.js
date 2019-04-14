import React from 'react';
import ReactDOM, { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

import getPositionnedParent from '../../utils/getPositionnedParent';

class Content extends React.Component {
   static propTypes = {
     getTriggerNode: PropTypes.func,
     getContentNode: PropTypes.func,
     placement: PropTypes.func,
     cushion: PropTypes.number,
     visible: PropTypes.bool,
     containerSelector: PropTypes.string
   }

   constructor(props) {
     super(props);
   }

   contentRefChange = (contentRefInstance) => {
     this.props.contentRefChange(contentRefInstance);
   }

   adjustPosition = () => {
     const {
      getTriggerNode,
      getContentNode,
      placement,
      cushion,
      containerSelector
     } = this.props;

     const containerNode = document.querySelector(containerSelector),
           anchor = getTriggerNode(),
           content = getContentNode(),
           positionnedParent = getPositionnedParent(containerNode, true);

     if (!anchor || !content || !positionnedParent) {
       return {};
     }
    
     const anchorBoundingBox = anchor.getBoundingClientRect(),
           contentBoundingBox = content.getBoundingClientRect(),
           parentBoundingBox = positionnedParent.getBoundingClientRect();

     const position = this.props.placement(
       anchorBoundingBox,
       contentBoundingBox,
       parentBoundingBox,
       {
         cushion
       }
     );

     return position;
   }

   render() {
     const {
      visible,
      containerSelector,
      className
     } = this.props;

     const containerNode = document.querySelector(containerSelector),
           position = this.adjustPosition();

     position.visibility = visible?'visible': 'hidden';
     
     const wrappedChildren = (
       <div
           ref={this.contentRefChange} 
           className={className}
           style={position}>
         {this.props.children}
       </div>
     )
     return createPortal(wrappedChildren, containerNode) 
   }
}

export default Content;