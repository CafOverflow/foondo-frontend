import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Search from './Search';
import RecipesList from './RecipesList';
import Header from './Header';
import { fetchFoondoApi, apiPaths } from './FoondoApi';

function Home() {
  const [localState, setState] = useState({
    recipes: [],
    showComponent: false,
  });

  const fetchRecipes = async query => {
    await fetchFoondoApi('GET', `${apiPaths.recipesComplexSearch}?query=${query}`)
      .then(data => data.json())
      .then(json => {
        setState({
          recipes: json,
          showComponent: true,
        });
      });
  };

  const homeContent = () => (
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

  return (
    <div className="wrapper">
      <header className="header">
        <Header />
      </header>
      <div className="home_wrapper">
        <Search placeholder="a recipe" fetchRecipes={fetchRecipes} />
        {localState.showComponent
          ? <RecipesList recipes={localState.recipes} />
          : homeContent()}
      </div>
    </div>
  );
}

export default Home;
