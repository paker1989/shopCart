import React from 'react';
import { BrowserRouter as Router, Route, Link, Prompt } from 'react-router-dom';

const PreventRouter = () => {
  return (
    <Router>
      <div>
        <ul>
          <li><Link to="/">Form</Link></li>
          <li><Link to="/one">One</Link></li>
        </ul>

        <Route exact path="/" component={Form} />
        <Route path="/one" render={() => <div>One</div>} />
      </div>
    </Router>
  );
}

class Form extends React.Component {
  state = { isBlocking: false };

  onSubmit = (event) => {
    console.log(event);
    event.preventDefault();
    event.target.reset();
    this.setState({ isBlocking: false });
  }

  render() {
    const { isBlocking } = this.state;

    return (
      <form onSubmit={(event) => this.onSubmit(event)}>
        <h3>
          Blocking? {" "}
          {isBlocking? "Yes, click a link or the back button": "Nope"}
        </h3>

        <Prompt
          when={isBlocking}
          message={(location) => `are you sure you want to go to ${location.pathname}`}
        />
        
        <input 
          size="50"
          placeholder="type something to block transitions"
          onChange={(event) => {
            console.log(event)
            this.setState({ isBlocking: event.target.value.length > 0 })
          }}
        />
        <button>Submit to stop blocking</button>
      </form>
    );
  }
}

export default PreventRouter;
