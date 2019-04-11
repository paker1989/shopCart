import React from 'react';

class Content extends React.Component {
   static propTypes = {

   }

   constructor(props) {
     super(props);
   }

   render() {
     return (
       <div>
         {this.props.children}
       </div>
     );
   }
}

export default Content;