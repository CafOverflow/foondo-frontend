import React from 'react';
import RecipesList from './RecipesList';
import BackButton from './BackButton';

// create a function to load list of fav recipes from DB
// and pass them as props to RecipesList component

function CookBook() {
  return (
    <div className="cookbook-wrapper">
      <header className="cookbook-header">
        <BackButton />
        <h1>My Cook Book</h1>
      </header>
      <RecipesList />
    </div>
  );
}

export default CookBook;
