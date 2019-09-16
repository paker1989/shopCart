import * as React from 'react';

// const AppContext = React.createContext({});

// const App = () => {
//   return (
//     <AppContext.Provider value={{
//       username: 'superawesome'
//     }}>
//       <div className="App">
//         <Navbar/>
//       </div>
//     </AppContext.Provider>
//   );
// }

// const Navbar = () => {
//   const { username }= React.useContext(AppContext);
//   return <div>{username}</div>;
// }

// export default App;

// const myReducer = (state, action) => {
//   switch (action.type) {
//       case 'countUp':
//           return {
//               ...state,
//               count: state.count + 1,
//           };
//       default:
//           return state;
//   }
// };
// const [state, dispatcher] = React.useReducer(myReducer, {});

// const Person = ({ personId }) => {
//   const [loading, setLoading] = React.useState(true);
//   const [person, setPerson] = React.useState({});

//   React.useEffect(() => {
//     setLoading(true);
//     fetch(`https://swapi.co/api/people/${personId}/`)
//       .then(response => response.json())
//       .then(data => {
//         setPerson(data);
//         setLoading(false);
//       });
//   }, [personId]);

//   if (loading === true) {
//     return <p>Loading ...</p>;
//   }

//   return (
//     <div>
//       <p>You're viewing: {person.name}</p>
//       <p>Height: {person.height}</p>
//       <p>Mass: {person.mass}</p>
//     </div>
//   );
// };


// import { useState, useEffect } from 'react';

// // 底层 Hooks, 返回布尔值：是否在线
// function useFriendStatusBoolean(friendID) {
//     const [isOnline, setIsOnline] = useState(null);

//     function handleStatusChange(status) {
//         setIsOnline(status.isOnline);
//     }

//     useEffect(() => {
//         ChatAPI.subscribeToFriendStatus(friendID, handleStatusChange);
//         return () => {
//             ChatAPI.unsubscribeFromFriendStatus(friendID, handleStatusChange);
//         };
//     });

//     return isOnline;
// }

// // 上层 Hooks，根据在线状态返回字符串：Loading... or Online or Offline
// function useFriendStatusString(props) {
//     const isOnline = useFriendStatusBoolean(props.friend.id);

//     if (isOnline === null) {
//         return 'Loading...';
//     }
//     return isOnline ? 'Online' : 'Offline';
// }

// // 使用了底层 Hooks 的 UI
// function FriendListItem(props) {
//     const isOnline = useFriendStatusBoolean(props.friend.id);

//     return (
//         <li style={{ color: isOnline ? 'green' : 'black' }}>
//             {props.friend.name}
//         </li>
//     );
// }

// // 使用了上层 Hooks 的 UI
// function FriendListStatus(props) {
//     const statu = useFriendStatusString(props.friend.id);

//     return <li>{statu}</li>;
// }
