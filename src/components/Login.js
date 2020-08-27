/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext, useState } from 'react';
import { AppContext } from './Context';
import { login } from './FoondoApi';

function Login() {
  const changeRouteToSignUp = () => {
    window.location.href = '/signup';
  };
  const changeRoute = () => {
    window.location.href = '/';
  };

  const [message, setMessage] = useState({
    text: '',
  });

  const [emailState, setEmail] = useState({
    value: '',
  });

  const [passwordState, setPassword] = useState({
    password: '',
  });

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
    await login(body)
      .then(res => res.json())
      .then(json => localStorage.setItem('jwt', json.jwt));
  };

  const handleSubmit = async event => {
    event.preventDefault();
    if (!emailState.value || !passwordState.password) {
      setMessage({ text: 'Please fill in both fields!' });
    } else {
      handleEmailChange(emailState.value);
      await sendData();
      if (localStorage.getItem('jwt') !== 'undefined') {
        changeRoute();
        setEmail({
          value: '',
        });
        setPassword({
          password: '',
        });
      } else {
        // eslint-disable-next-line no-alert
        setMessage({ text: 'Wrong email or password. Please try again!' });
      }
    }
  };

  return (

    <div className="entry-wrapper">
      <h1>foondo</h1>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="login-title">welcome back!</div>
        <div id="error-message" className="error-message">
          {message.text}
        </div>
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
        <div>
          Need to register?
          <a className="redirect-link" onClick={changeRouteToSignUp}> Sign up</a>
        </div>
      </form>
    </div>

  );
}

export default Login;
