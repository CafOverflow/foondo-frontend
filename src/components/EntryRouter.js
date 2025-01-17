import React from 'react';
import {
  BrowserRouter as Router,
  Route, Switch,
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
        <h1>foondo</h1>
        <button type="button" onClick={changeRouteToSignUp} className="entry-button entry-button-hover">sign up</button>
        <button type="button" onClick={changeRouteToLogin} className="entry-button entry-button-hover">sign in</button>
      </div>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />
      </Switch>
    </Router>
  );
}

export default EntryRouter;
