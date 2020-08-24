import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
} from 'react-router-dom';
import Login from './Login';
import SignUp from './SignUp';

function EntryRouter() {
  return (
    <Router>
      <div><Link to="/login">Login</Link></div>
      <div><Link to="/signup">SignUp</Link></div>
      <div>
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />
      </div>
    </Router>
  );
}

export default EntryRouter;
