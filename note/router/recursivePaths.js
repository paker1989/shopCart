import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const PEEPS = [
  { id: 0, name: "Michelle", friends: [1, 2, 3] },
  { id: 1, name: "Sean", friends: [0, 3] },
  { id: 2, name: "Kim", friends: [0, 1, 3] },
  { id: 3, name: "David", friends: [1, 2] }
];

export default () => {
  return (
    <Router>  
      <Friend id="0" matchUrl=""/>
    </Router>
  );
}

const Friend = ({ id, matchUrl }) => {
  const target = PEEPS[id];
  const childrens = target.friends.map(id => {
    return (
      <li key={id}><Link to={`${matchUrl}/${id}`}>{PEEPS[id].name}</Link></li>
    );
  })

  return (
    <div className="friend-container">
      <h3>{target.name}'s friends</h3>
      <ul>
        {childrens}
      </ul>
      <Route path={`${matchUrl}/:friendId`} children={({ match }) => {
        return (
          match && (
            <Friend 
              id={match.params.friendId} 
              matchUrl={`${matchUrl}/${match.params.friendId}`} 
            />
          )
        );
      }}/>
    </div>
  );
}