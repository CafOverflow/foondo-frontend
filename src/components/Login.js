import React, { Component } from 'react';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
  }

  handleValueChange = event => {
    this.setState({ value: event.target.value });
  }

  handleSubmit = event => {
    const { value } = this.state;
    event.preventDefault();
    if (!value) {
      // eslint-disable-next-line no-alert
      window.alert('Please enter correct information!');
    } else {
      this.setState({ value: '' });
    }
  }

  render() {
    const { value } = this.state;
    return (
      <form onSubmit={this.handleSubmit} className="login-form">
        <h4>Login</h4>
        <input
          className="login-form-input"
          type="text"
          value={value}
          onChange={this.handleValueChange}
          placeholder="Enter your username" />
        <input
          className="login-form-input"
          type="text"
          value={value}
          onChange={this.handleValueChange}
          placeholder="Enter your password" />

        <input
          className="login-form-button"
          type="submit"
          value="Login" />
      </form>
    );
  }
}

export default Login;
