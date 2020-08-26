import React, { useContext, useState, useEffect } from 'react';
import {
  Link,
} from 'react-router-dom';
import Search from './Search';
import IngredientsList from './IngredientsList';
import RecipesList from './RecipesList';
import BackButton from './BackButton';
import { AppContext } from './Context';

function Fridge() {
  const [localState, setState] = useState({
    showComponent: false,
  });
  const [buttonState, setButtonState] = useState({
    showButton: false,
  });

  const {
    state, showRecipes, getDietFromDB, getIntoleranciesFromDB, getIngredients,
  } = useContext(AppContext);

  useEffect(() => {
    getIngredients();
    return () => {
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const jwt = localStorage.getItem('jwt');
  const fetchRecipesByIngredients = async () => {
    const ingredients = state.ingredients.join();
    const query = `http://localhost:3001/recipes/complexSearch?query=${ingredients}`;
    await fetch(query, {
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

  const fetchDiet = () => {
    getDietFromDB();
    getIntoleranciesFromDB();
    setButtonState({
      showButton: true,
    });
  };

  const fetchRecipesByIngredientsAndDiet = async () => {
    const ingredients = state.ingredients.join();
    let query = `http://localhost:3001/recipes/complexSearch?query=${ingredients}`;

    if (state.selectedIntolerances) {
      const intolerances = state.selectedIntolerances.join();
      query = `http://localhost:3001/recipes/complexSearch?query=${ingredients}&diet=${state.selectedDiet}&intolerances=${intolerances}`;
    } else {
      query = `http://localhost:3001/recipes/complexSearch?query=${ingredients}&diet=${state.selectedDiet}`;
    }
    await fetch(query, {
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
            <>
              <button
                onClick={fetchRecipesByIngredients}
                type="button"
                className="fridge-button">
                I want to cook!
              </button>
              <button
                onClick={fetchDiet}
                type="button"
                className="fridge-button">
                Check my diet
              </button>
              {state.selectedDiet && state.selectedIntolerances
                && (
                <div>
                  <div>
                    Diet:
                    {state.selectedDiet}
                  </div>
                  <div>
                    Intolerances:
                    {state.selectedIntolerances}
                  </div>
                  <Link to="/diet">Change</Link>
                </div>
                )}
                {
                  buttonState.showButton
                    ? (
                      <button
                        onClick={fetchRecipesByIngredientsAndDiet}
                        type="button"
                        className="fridge-button">
                        I want to cook using my diet settings!
                      </button>
                    ) : null
                }
            </>
          )}
        {localState.showComponent
          ? <RecipesList recipes={state.recipes} />
          : null}
      </div>
    </div>
  );
}

export default Fridge;
