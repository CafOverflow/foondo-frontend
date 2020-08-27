import React, { useContext, useState, useEffect } from 'react';
import {
  Link,
} from 'react-router-dom';
import Search from './Search';
import IngredientsList from './IngredientsList';
import RecipesList from './RecipesList';
import Header from './Header';
import { AppContext } from './Context';
import { fetchFoondoApi, apiPaths } from './FoondoApi';

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

  const fetchRecipesByIngredients = async () => {
    const ingredients = state.ingredients.map(i => i.name).join();
    const query = `?query=${ingredients}`;
    fetchFoondoApi('GET', `${apiPaths.recipesComplexSearch}${query}`)
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
    const ingredients = state.ingredients.map(i => i.name).join();
    let query = `?query=${ingredients}`;

    if (state.selectedIntolerances) {
      const intolerances = state.selectedIntolerances.join();
      query = `?query=${ingredients}&diet=${state.selectedDiet}&intolerances=${intolerances}`;
    } else {
      query = `?query=${ingredients}&diet=${state.selectedDiet.replace(/ /g, '')}`;
    }
    await fetchFoondoApi('GET', `${apiPaths.recipesComplexSearch}${query}`)
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
        <Header />
      </header>
      <div className="page-wrapper-search">
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
                className="default-button">
                I want to cook!
              </button>
              <button
                onClick={fetchDiet}
                type="button"
                className="default-button">
                Check my diet
              </button>
              {state.selectedDiet && state.selectedIntolerances
                && buttonState.showButton && (
                  <div className="diet-intolerance-wrapper">
                    <div>
                      Diet:
                      &nbsp;
                      {state.selectedDiet}
                    </div>
                    <div>
                      {state.selectedIntolerances.length > 0 ? (
                        <div>
                          <br />
                          Intolerances:
                        &nbsp;
                          {state.selectedIntolerances.map(i => (
                            <div key={i.value}>
                              <span className="ingredient-intolerances">{i.value}</span>
                              <br />
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div>
                          Intolerances:
                          None
                        </div>
                      )}
                    </div>
                    <br />
                    <Link className="diet-change" to="/diet">Change</Link>
                  </div>
              )}
              {
                buttonState.showButton
                  ? (
                    <button
                      onClick={fetchRecipesByIngredientsAndDiet}
                      type="button"
                      className="default-button">
                      I want to cook using
                      <br />
                      my diet settings!
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
