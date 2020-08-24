import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from './Context';

function Login() {
  const [localState, setState] = useState({
    value: '',
    // password: '',
  });

  const {
    handleNameChange,
  } = useContext(AppContext);

  const handleValueChange = event => {
    setState({ value: event.target.value });
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (!localState.value) {
      // eslint-disable-next-line no-alert
      window.alert('Please enter correct information!');
    } else {
      handleNameChange(localState.value);
      setState({ value: '' });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <h4>Login</h4>
      <input
        className="login-form-input"
        type="text"
        value={localState.value}
        onChange={handleValueChange}
        placeholder="Enter your username" />
      {/* <input
        className="login-form-input"
        type="text"
        value={localState.password}
        onChange={handleValueChange}
        placeholder="Enter your password" /> */}
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
