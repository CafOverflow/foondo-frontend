/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';

function SignUp() {
  const changeRouteToLogin = () => {
    window.location.href = '/login';
  };

  return (
    <form className="login-form">
      <div className="login-title">sign up</div>
      <input
        className="entry-button login-form-input"
        type="text"
        placeholder="email" />
      <input
        className="entry-button login-form-input"
        type="password"
        placeholder="password" />
      <input
        className="entry-button login-form-input"
        type="password"
        placeholder="confirm password" />
      <input
        className="entry-button login-form-button"
        type="submit"
        value="sign up" />
      <div>
        Already a member?
        <a className="redirect-link" onClick={changeRouteToLogin}> Sign in</a>
      </div>
    </form>
  );
}

export default SignUp;
