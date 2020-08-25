import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';
import { slide as Menu } from 'react-burger-menu';
import Home from './Home';
import Diet from './Diet';
import Fridge from './Fridge';
import CookBook from './CookBook';
import ProtectedRoute from './ProtectedRoute';
import EntryRouter from './EntryRouter';
import Login from './Login';
import SignUp from './SignUp';

function AppMenu() {
  const [state, setState] = useState({
    menuOpen: false,
  });

  const handleStateChange = () => {
    setState({ menuOpen: state.isOpen });
  };

  const closeMenu = () => {
    setState({ menuOpen: false });
  };

  return (
    <Router>
      <Menu
        right
        isOpen={state.menuOpen}
        onStateChange={localState => handleStateChange(localState)}>
        <div>
          <Link onClick={closeMenu} exact="true" to="/">Home</Link>
        </div>
        <div>
          <Link onClick={closeMenu} to="/diet">Diet</Link>
        </div>
        <div>
          <Link onClick={closeMenu} to="/fridge">My Fridge</Link>
        </div>
        <div>
          <Link onClick={closeMenu} to="/cookbook">My Cook Book</Link>
        </div>
      </Menu>
      <div>
        <Switch>
          <Route path="/welcome" component={EntryRouter} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={SignUp} />
          <ProtectedRoute exact path="/" Component={Home} />
          <ProtectedRoute path="/diet" Component={Diet} />
          <ProtectedRoute path="/fridge" Component={Fridge} />
          <ProtectedRoute path="/cookbook" Component={CookBook} />
        </Switch>
      </div>
    </Router>
  );
}

export default AppMenu;
