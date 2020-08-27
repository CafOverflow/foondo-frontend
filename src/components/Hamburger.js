import React, { useState } from 'react';
import {
  Link,
} from 'react-router-dom';
import { slide as Menu } from 'react-burger-menu';

function Hamburger() {
  const [state, setState] = useState({
    menuOpen: false,
  });

  const handleStateChange = () => {
    setState({ menuOpen: state.isOpen });
  };

  const closeMenu = () => {
    setState({ menuOpen: false });
  };

  const logOut = () => {
    localStorage.clear();
  };

  return (
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
      <div>
        <Link onClick={logOut} exact="true" to="/">
          Log Out
        </Link>
      </div>
    </Menu>
  );
}

export default Hamburger;
