import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from './Context';

function Login() {
  const [emailState, setEmail] = useState({
    value: '',
  });
  console.log(emailState);

  const [passwordState, setPassword] = useState({
    password: '',
  });
  console.log(passwordState);

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
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (!emailState.value || !passwordState.password) {
      // eslint-disable-next-line no-alert
      window.alert('Please enter correct information!');
    } else {
      handleEmailChange(emailState.value);
      sendData();
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
      <h4>Login</h4>
      <input
        className="login-form-input"
        type="text"
        value={emailState.value}
        onChange={handleValueChange}
        placeholder="Enter your e-mail" />
      <input
        className="login-form-input"
        type="text"
        value={passwordState.password}
        onChange={handlePasswordChange}
        placeholder="Enter your password" />
      <input
        className="login-form-button"
        type="submit"
        value="Login" />
      <Link exact="true" to="/">
        <button type="button">My App</button>
      </Link>
    </form>
  );
}

export default Login;
