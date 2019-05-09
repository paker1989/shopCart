import React from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import throttle from 'lodash/throttle';

import getPositionnedParent from '../../utils/getPositionnedParent';
import WindowEventHandler from '../../utils/components/windowEventHandler';
import WindowResizeHandler from '../../utils/components/windowResizeHandler';

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
     this.state = {style: {}};
   }

   componentDidMount() {
     const { visible } = this.props;
     if (visible) {
      this.adjustPosition();
     }
   }

   componentDidUpdate(prevProps) {
     if (this.props.visible && prevProps.visible !== this.props.visible) {
       this.adjustPosition();
     }
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

     const position = placement(
       anchorBoundingBox,
       contentBoundingBox,
       parentBoundingBox,
       { cushion }
     );

     this.setState({
       style: {
         ...position,
       }
     })
   }

   onWindowResize = throttle((evt, delta) => {
     const { visible } = this.props;
     if (visible && (delta.x !== 0 || delta.y !== 0)) {
      this.adjustPosition();
     }}, 16);

   onWindowScroll = throttle(this.adjustPosition, 16);

   render() {
     const {
       visible,
       containerSelector,
       className
     } = this.props;
     const { style } = this.state;
     let wrapperStyle = {
       ...style,
       visibility: visible? 'visible': 'hidden'
     }

     const containerNode = document.querySelector(containerSelector);
     
     const wrappedChildren = (
       <div
           ref={this.contentRefChange} 
           className={className}
           style={wrapperStyle}>
         {this.props.children}
         <WindowResizeHandler onResize={this.onWindowResize}/>
         <WindowEventHandler eventName="scroll" callbackFn={this.onWindowScroll}/>
       </div>
     )
     return createPortal(wrappedChildren, containerNode) 
   }
}

export default Content;