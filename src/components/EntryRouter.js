import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import Login from './Login';
import SignUp from './SignUp';

function EntryRouter() {
  const changeRouteToLogin = () => {
    window.location.href = '/login';
  };
  const changeRouteToSignUp = () => {
    window.location.href = '/signup';
  };
  return (
    <Router>
      <div className="entry-wrapper">
        <button type="button" onClick={changeRouteToSignUp} className="entry-button entry-button-hover">sign up</button>
        <button type="button" onClick={changeRouteToLogin} className="entry-button entry-button-hover">sign in</button>
      </div>
      <div>
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />
      </div>
    </Router>
  );
}

export default EntryRouter;
