import React, { useContext, useEffect } from 'react';
import RecipesList from './RecipesList';
import Header from './Header';
import { AppContext } from './Context';

function CookBook() {
  const {
    state, getBookmarkedRecipes,
  } = useContext(AppContext);

  const recipes = state.favouriteRecipes;

  useEffect(() => {
    getBookmarkedRecipes();
    return () => {
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="wrapper">
      <header className="header">
        <Header />
      </header>
      <h1>My Cook Book</h1>
      <div className="">
        <div className="page-header">My Cookbook</div>
        <RecipesList recipes={recipes} />
      </div>
    </div>
  );
}

export default CookBook;
