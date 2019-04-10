import React from 'react';
import { CSSTransition } from 'react-transition-group';

export default class CSSTransitionDemo extends React.Component {
  state = {
    showValidButton: false,
    showValidMessage: false,
    name: ''
  }

  validInput = () => {
    this.setState(state => ({
      showValidButton: false,
      showValidMessage: true
    }))
  }

  render() {
    const { showValidButton, showValidMessage, name : currentName } = this.state;

    return (
      <form>
        <p>Your name</p>
        <input type="text"
               placeholder="enter.."
               onFocus={() => {
                 this.setState({
                   showValidMessage: false
                 })
               }}
               onChange={(event) => {
                 this.setState({
                   showValidButton: true,
                   name: event.target.value
                 })
               }}
        />
        <CSSTransition
          in={showValidMessage}
          timeout="300"
          classNames="message"
          onExited={() => [
            this.setState({
              showValidButton: true
            })
          ]}
          unmountOnExit
        >
          {
            state => {
              return (
                <div>
                  `your name ${currentName} rocks`
                  <CSSTransition
                    in={state === 'entered'}
                    timeout="300"
                    classNames="done"
                    unmountOnExit
                  >
                    <p>well done!</p>
                  </CSSTransition>
                </div>
              );
            }
          }
        </CSSTransition>
        {
          showValidButton ? (
            <button onClick={this.validInput}>Valid your form</button>
          ) : null
        }
      </form>
    );
  }
}