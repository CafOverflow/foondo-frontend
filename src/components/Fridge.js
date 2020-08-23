import React, { useContext, useState } from 'react';
import Search from './Search';
import IngredientsList from './IngredientsList';
import RecipesList from './RecipesList';
import BackButton from './BackButton';
import { AppContext } from './Context';

function Fridge() {
  const [localState, setState] = useState({
    showComponent: false,
  });
  const {
    state, showRecipes,
  } = useContext(AppContext);

  // make a request to backend that calls the API to load results of relevant recipes
  // result: RecipesList component to be rendered with data from the response from backend
  const fetchRecipesByIngredients = async () => {
    const query = state.ingredients.join();
    await fetch(`http://localhost:3001/recipes/complexSearch?query=${query}`)
      .then(data => data.json())
      .then(json => {
        showRecipes({ recipes: json });
      });
    setState({
      showComponent: true,
    });
  };

  return (
    <div className="fridge-wrapper">
      <header className="fridge-header">
        <BackButton />
        <h1>My Fridge</h1>
      </header>
      {/* pass to the Search component a function
        as a prop that will handle the request to backend (+request to API)
         to load the list of the relevant ingredients
         + create button that will add an ingredient to the DB */}
      <Search />
      {/* ingredients list component should be rendered with data from DB */}
      <IngredientsList ingredients={state.ingredients} />
      <button
        onClick={fetchRecipesByIngredients}
        type="button"
        className="fridge-button">
        I want to cook!
      </button>
      {localState.showComponent
        ? <RecipesList />
        : null}
      {/* <RecipesList recipes={state.recipes} /> */}
    </div>
  );
}

export default Fridge;
