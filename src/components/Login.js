import React, { useContext, useState } from 'react';
import { AppContext } from './Context';

function Login() {
  const changeRoute = () => {
    window.location.href = '/';
  };

  const [emailState, setEmail] = useState({
    value: '',
  });

  const [passwordState, setPassword] = useState({
    password: '',
  });

  // const [loginState, setLoginState] = useState({
  //   isLogged: null,
  // });

  const {
    handleEmailChange,
  } = useContext(AppContext);

  const handleValueChange = event => {
    setEmail({
      value: event.target.value,
    });
  };

  const handlePasswordChange = event => {
    setPassword({
      password: event.target.value,
    });
  };

  const body = {
    data: {
      password: passwordState.password,
      email: emailState.value,
    },
  };

  const sendData = async () => {
    await fetch('http://localhost:3001/login', {
      mode: 'cors',
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    }).then(res => res.json())
      .then(json => localStorage.setItem('jwt', json.jwt));
    // setLoginState({
    //   isLogged: true,
    // });
  };

  const handleSubmit = async event => {
    event.preventDefault();
    if (!emailState.value || !passwordState.password) {
      // eslint-disable-next-line no-alert
      window.alert('Please enter correct information!');
    } else {
      handleEmailChange(emailState.value);
      await sendData();
      changeRoute();
      setEmail({
        value: '',
      });
      setPassword({
        password: '',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <div className="login-title">welcome back!</div>
      <input
        className="entry-button login-form-input"
        type="text"
        value={emailState.value}
        onChange={handleValueChange}
        placeholder="e-mail" />
      <input
        className="entry-button login-form-input"
        type="password"
        value={passwordState.password}
        onChange={handlePasswordChange}
        placeholder="password" />
      <input
        className="entry-button login-form-button"
        type="submit"
        value="sign in" />
    </form>
  );
}

export default Login;
