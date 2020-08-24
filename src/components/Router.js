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
import RecipesList from './RecipesList';
import Fridge from './Fridge';
import CookBook from './CookBook';

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
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/recipes">
            <RecipesList />
          </Route>
          <Route path="/diet">
            <Diet />
          </Route>
          <Route path="/fridge">
            <Fridge />
          </Route>
          <Route path="/cookbook">
            <CookBook />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default AppMenu;
