import React from 'react';
import { Transition } from 'react-transition-group';


const inProp = 'false';

class Demo extends React.Component {
  state = { in: false };
  
  toggleState =() => {
    this.setState((state) => ({
      in: !state.in
    }))
  }

  render() {
    return (
      <>
        <Transition in={this.state.in} timeout="500">
          {
            state => {
              switch(state) {
                case "entering": 
                  return "entering";
                case "exited": 
                  return "exited";                
              }
            }
          }
        </Transition>
        <button onClick={() => {this.toggleState()}}>Click</button>
      </>
    );
  }
}