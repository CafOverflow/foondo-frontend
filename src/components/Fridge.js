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
  const jwt = localStorage.getItem('jwt');
  const fetchRecipesByIngredients = async () => {
    const query = state.ingredients.join();
    await fetch(`http://localhost:3001/recipes/complexSearch?query=${query}`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    })
      .then(data => data.json())
      .then(json => {
        showRecipes(json);
      });
    setState({
      showComponent: true,
    });
  };
  return (
    <div className="wrapper">
      <header className="header">
        <BackButton />
        <h1>My Fridge</h1>
      </header>
      <div className="page-wrapper">
        <div className="page-header">My Ingredients</div>
        {/* pass to the Search component a function
        as a prop that will handle the request to backend (+request to API)
         to load the list of the relevant ingredients
         + create button that will add an ingredient to the DB */}
        <Search placeholder="an ingredient" fetchRecipes={fetchRecipesByIngredients} />
        {/* ingredients list component should be rendered with data from DB */}
        <IngredientsList ingredients={state.ingredients} />
        {state.ingredients.length > 0
          && (
            <button
              onClick={fetchRecipesByIngredients}
              type="button"
              className="fridge-button">
              I want to cook!
            </button>
          )}
        {localState.showComponent
          ? <RecipesList />
          : null}
        <RecipesList recipes={state.recipes} />
      </div>
    </div>
  );
}

export default Fridge;
