import { useState } from 'react';
import { fetchCreateSession } from './services';

const Login = function({ onLogin }) {
  const[username,setUsername] = useState('');
  const[isDisabled,setIsDisabled]= useState(true);
  const [isPending, setIsPending] = useState(false);
  const [status, setStatus] = useState('');

  const onChange = (e) => {
    setUsername(e.target.value);
    setIsDisabled(!e.target.value);
  };

  const login = () => {
    setIsPending(true);
    fetchCreateSession({ username })
    .then( userinfo => {
      setStatus('');
      setIsPending(false);
      onLogin({ username});
    })
    .catch( err => {
      setStatus(err.error);
      setIsPending(false);
    });
  };

  return (
  <div>
    { status && <div className ="status">{status}</div>}
    <div className = "login-form">
    <label>
      Username:
      <input disabled = {isPending} onChange = {onChange} value = {username}></input>
      <button onClick = {login} disabled ={isDisabled || isPending}>{ isPending ? "...":"Login"}</button>
    </label>
    </div>
  </div>
  );
};

export default Login;