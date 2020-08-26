import React from 'react';
import BackButton from './BackButton';
import Hamburger from './Hamburger';

function Header() {
  return (
    <header className="header">
      <BackButton />
      <Hamburger />
      <h1>Foondo</h1>
    </header>
  );
}

export default Header;
