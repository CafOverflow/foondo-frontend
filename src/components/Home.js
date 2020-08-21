import React from 'react';
import {
  Link,
} from 'react-router-dom';
import Search from './Search';
import BackButton from './BackButton';

function Home() {
  return (
    <div className="home-wrapper">
      <header className="home-header">
        <BackButton />
        <h1>Foondo</h1>
      </header>
      <div>Find a recipe!</div>
      <Search />
      <div>
        <Link to="/fridge">My Fridge</Link>
      </div>
      <div>
        <Link to="/cookbook">My Cook Book</Link>
      </div>
    </div>
  );
}

export default Home;
