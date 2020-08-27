/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { fetchFoondoApi, apiPaths } from './FoondoApi';

function SignUp() {
  const changeRouteToLogin = () => {
    window.location.href = '/login';
  };

  const [message, setMessage] = useState({ message: '' });

  const submitNewUser = event => {
    event.preventDefault();
    const form = event.target;
    if (form.password.value === form.password2.value) {
      fetchFoondoApi('POST', apiPaths.user, { data: { email: form.email.value, password: form.password.value } })
        .then(() => setMessage({ message: 'User succesfully created' }));
    } else {
      setMessage({ message: 'Passwords don\'t match!' });
    }
  };

  return (
    <div className="entry-wrapper">
      <form onSubmit={submitNewUser} className="login-form">
        <div className="login-title">sign up</div>
        <input
          autoComplete="e-mail"
          id="email"
          className="entry-button login-form-input"
          type="text"
          placeholder="email" />
        <input
          autoComplete="desired password"
          id="password"
          className="entry-button login-form-input"
          type="password"
          placeholder="password" />
        <input
          autoComplete="repeat password"
          id="password2"
          className="entry-button login-form-input"
          type="password"
          placeholder="confirm password" />
        {message.message}
        <input
          className="entry-button login-form-button"
          type="submit"
          value="sign up" />
        <div>
          Already a member?
          <a className="redirect-link" onClick={changeRouteToLogin}> Sign in</a>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
