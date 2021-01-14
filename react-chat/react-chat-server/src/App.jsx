
import './App.css';
import { useState, useEffect } from 'react';
import { fetchEndSession, fetchCheckSession } from './services';
import Nav from './Nav';
import Login from './Login';
import ShowStuff from './ShowStuff';

function App() {
  const [userState,setUserState] = useState({ isLoggedIn: false, isPending: true });
  const [userName,setUserName] = useState('');

  useEffect( () => {
    fetchCheckSession()
    .then( userinfo => {
      setUserState({
        isLoggedIn: true,
        isPending: false,
      });
      setUserName(userinfo.username);
    })
    .catch( () => {
      setUserState({
        isLoggedIn: false,
        isPending: false,
      });
    });
  }, []); 

  const login = function({username}) {
    setUserState({
      isLoggedIn: true,
      isPending: false,
    });
    setUserName(username);
  };

  if(userState.isPending) {
    return (
      <div className="app">
        Loading...
      </div>
    );
  }

  const logout = function() {
    setUserState({
      ...userState,
      isPending: true,
    });
    fetchEndSession()
    .then( () => {
      setUserState({
        isLoggedIn: false,
        isPending: false,
      });
    })
    .catch( () => {
      setUserState({
        ...userState,
        isPending: false,
      });
    });
  };

  let content;
  if(userState.isLoggedIn) {
    content = <ShowStuff username={userName}/>;
  } 
  else {
    content = <Login onLogin={login}/>;
  }

  return (
    <div className="app">
    <h2 className = "title">Chat Room</h2>
    <Nav user={userState} onLogout={logout}/>
     {content}
    </div>
  );
}

export default App;