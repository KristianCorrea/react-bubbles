import React, {useState} from "react";
import {axiosWithAuth} from "../utils/axiosWithAuth"

const Login = (props) => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [login, setLogin]=useState({username: '', password: ''})
  const [buttonDisabled, setButtonDisabled]=useState(true)
  const [failedToLogin, setFailedToLogin]=useState(false)

  const handleChanges=event=>{
    setLogin({...login, [event.target.name]: event.target.value})
    if(login.username.length>0 && login.password.length>0){
      setButtonDisabled(false)
    }
  }

  const submitLogin = event => {
    event.preventDefault();
    axiosWithAuth()
      .post('/api/login', login)
      .then(res=>{
        localStorage.setItem('token', JSON.stringify(res.data.payload));
        props.history.push('/protected')
      })
      .catch(err=>{
        setFailedToLogin(true);
        console.log({err});
      })
  }
  return (
    <div>
      <h1>Welcome to the Bubble App!</h1>
      <form className="loginForm" onSubmit={submitLogin}>
        <label>Username:
          <input name='username' type="text" onChange={handleChanges}/>
        </label>
        <label>Password:
          <input name='password' type='password' onChange={handleChanges}/>
        </label>
        <button disabled={buttonDisabled} 
          className='loginButton' 
          name='submit' 
          type='submit'
          >
          Login
        </button>
        <p style={{color: 'red'}}>{failedToLogin===false?'':'Failed to login.'}</p>
      </form>
    </div>
  );
};

export default Login;
