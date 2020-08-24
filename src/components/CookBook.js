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
    <div className="cookbook-wrapper">
      <header className="cookbook-header">
        <BackButton />
        <h1>My Cook Book</h1>
      </header>
      <RecipesList recipes={state.favouriteRecipes} />
    </div>
  );
}

export default CookBook;
