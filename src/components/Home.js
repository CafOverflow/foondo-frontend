import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Search from './Search';
import RecipesList from './RecipesList';
import Header from './Header';

function Home() {
  const [localState, setState] = useState({
    recipes: [],
    showComponent: false,
  });

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

  const homeContent = () => {
    return (
      <div>
        <Link to="/fridge">
          <div className="link link-ingredients">
            <p>INGREDIENTS</p>
          </div>
        </Link>
        <Link to="/cookbook">
          <div className="link link-cookbook">
            <p>COOKBOOK</p>
          </div>
        </Link>
      </div>
    );
  };

  return (
    <div className="wrapper">
      <header className="header">
        <Header />
      </header>
      <div className="home_wrapper">
        <Link exact="true" to="/">
          <button type="button" onClick={logOut}>Log Out</button>
        </Link>
        <Search placeholder="a recipe" fetchRecipes={fetchRecipes} />
        {localState.showComponent
          ? <RecipesList recipes={localState.recipes} />
          : homeContent()}
      </div>
    </div>
  );
}

export default Home;
