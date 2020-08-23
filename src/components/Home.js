import React, { useContext } from 'react';
import {
  Link,
} from 'react-router-dom';
import Search from './Search';
import BackButton from './BackButton';
import { AppContext } from './Context';

function Home() {
  const {
    state,
  } = useContext(AppContext);
  return (
    <div className="home-wrapper">
      <header className="home-header">
        <BackButton />
        <h1>Foondo</h1>
      </header>
      {state.userName
          && (
          <div>
            Hello,
            {state.userName}
            !
          </div>
          )}
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
