import React from 'react';

function SignUp() {
  return (
    <form className="login-form">
      <h4>Sign Up</h4>
      <input
        className="login-form-input"
        type="text"
        placeholder="Enter your name" />
      <input
        className="login-form-input"
        type="text"
        placeholder="Enter your e-mail" />
      <input
        className="login-form-input"
        type="text"
        placeholder="Enter your password" />
      <input
        className="login-form-button"
        type="submit"
        value="SignUp" />
    </form>
  );
}

export default SignUp;
