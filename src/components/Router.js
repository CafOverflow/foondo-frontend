import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Home from './Home';
import Diet from './Diet';
import Fridge from './Fridge';
import CookBook from './CookBook';
import ProtectedRoute from './ProtectedRoute';
import EntryRouter from './EntryRouter';
import Login from './Login';
import SignUp from './SignUp';

function AppMenu() {
  return (
    <Router>
      <Switch>
        <Route path="/welcome" component={EntryRouter} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />
        <ProtectedRoute exact path="/" Component={Home} />
        <ProtectedRoute path="/diet" Component={Diet} />
        <ProtectedRoute path="/fridge" Component={Fridge} />
        <ProtectedRoute path="/cookbook" Component={CookBook} />
      </Switch>

    </Router>
  );
}

export default AppMenu;
