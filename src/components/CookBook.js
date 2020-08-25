import React, { useContext } from 'react';
import RecipesList from './RecipesList';
import BackButton from './BackButton';
import { AppContext } from './Context';

// create a function to load list of fav recipes from DB
// and pass them as props to RecipesList component

function CookBook() {
  const {
    state,
  } = useContext(AppContext);
  return (
    <div className="wrapper">
      <header className="header">
        <BackButton />
        <h1>My Cook Book</h1>
      </header>
      <div className="page-wrapper">
        <div className="page-header">My Cookbook</div>
        <RecipesList recipes={state.favouriteRecipes} />
      </div>
    </div>
  );
}

export default CookBook;
