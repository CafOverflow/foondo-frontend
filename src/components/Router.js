import React, { Component } from 'react';
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

class AppMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuOpen: false,
    };
  }

  handleStateChange = state => {
    this.setState({ menuOpen: state.isOpen });
  }

  closeMenu = () => {
    this.setState({ menuOpen: false });
  }

  render() {
    const { menuOpen } = this.state;
    return (
      <Router>
        <Menu
          right
          isOpen={menuOpen}
          onStateChange={state => this.handleStateChange(state)}>
          <div>
            <Link onClick={this.closeMenu} exact="true" to="/">Home</Link>
          </div>
          <div>
            <Link onClick={this.closeMenu} to="/diet">Diet</Link>
          </div>
          <div>
            <Link onClick={this.closeMenu} to="/fridge">My Fridge</Link>
          </div>
          <div>
            <Link onClick={this.closeMenu} to="/cookbook">My Cook Book</Link>
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
}

export default AppMenu;
