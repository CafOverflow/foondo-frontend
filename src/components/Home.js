import React, { useContext, useState } from 'react';
import {
  Link,
} from 'react-router-dom';
import Search from './Search';
import BackButton from './BackButton';
import { AppContext } from './Context';
import RecipesList from './RecipesList';

function Home() {
  const [localState, setState] = useState({
    recipes: [],
    showComponent: false,
  });

  const {
    state,
  } = useContext(AppContext);

  const logOut = () => {
    localStorage.clear();
  };

  const jwt = localStorage.getItem('jwt');
  const fetchRecipes = async query => {
    await fetch(`http://localhost:3001/recipes/complexSearch?query=${query}`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    })
      .then(data => data.json())
      .then(json => {
        setState({
          recipes: json,
          showComponent: true,
        });
      });
  };

  return (
    <div className="wrapper">
      <header className="header">
        <BackButton />
        <h1>Foondo</h1>
      </header>
      <div className="page-wrapper">
        {localStorage.userName
          && (
          <div>
            Hello,
            {state.userName}
            !
          </div>
          )}
        <Link exact="true" to="/">
          <button type="button" onClick={logOut}>Log Out</button>
        </Link>
        <Search placeholder="a recipe" fetchRecipes={fetchRecipes} />
        {localState.showComponent
          ? <RecipesList recipes={localState.recipes} />
          : null}
        <div className="link">
          <Link to="/fridge">INGREDIENTS</Link>
        </div>
        <div className="link">
          <Link to="/cookbook">COOKBOOK</Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
