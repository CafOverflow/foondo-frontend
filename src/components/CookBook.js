import React, { useContext, useEffect } from 'react';
import RecipesList from './RecipesList';
import BackButton from './BackButton';
import { AppContext } from './Context';

function CookBook() {
  const {
    state, getBookmarkedRecipes,
  } = useContext(AppContext);

  useEffect(() => {
    getBookmarkedRecipes();
    return () => {
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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
