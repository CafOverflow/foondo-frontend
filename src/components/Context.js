/* eslint-disable arrow-body-style */
import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';
import { fetchFoondoApi, apiPaths } from './FoondoApi';

const AppContext = createContext();
function AppContextProvider({ children }) {
  const [state, setState] = useState({
    ingredients: [],
    recipes: [],
    favouriteRecipes: [],
    selectedDiet: null,
    selectedIntolerances: [],
    userName: null,
    recipeIngredients: [],
  });

  const handleEmailChange = name => {
    setState(prevState => ({
      ...prevState,
      userName: name,
    }));
  };

  const showIngredients = ingredient => {
    setState(prevState => ({
      ...prevState,
      ingredients: [
        ...prevState.ingredients,
        ingredient,
      ],
    }));
  };

  const showRecipes = recipe => {
    setState(prevState => ({
      ...prevState,
      recipes: recipe,
    }));
  };

  const favouriteRecipe = recipe => {
    const recipeForFetch = {
      recipe,
    };
    fetchFoondoApi('POST', apiPaths.recipeBookmarks, recipeForFetch)
      .then(() => {
        setState(prevState => ({
          ...prevState,
          favouriteRecipes: [
            ...prevState.favouriteRecipes,
            recipe,
          ],
        }));
      });
  };

  const unfavouriteRecipe = recipeId => {
    fetchFoondoApi('DELETE', `${apiPaths.recipeBookmarks}${recipeId}`)
      .then(() => {
        setState(prevState => ({
          ...prevState,
          favouriteRecipes: prevState.favouriteRecipes.filter(r => r.id !== recipeId),
        }));
      });
  };

  const getBookmarkedRecipes = () => {
    fetchFoondoApi('GET', apiPaths.recipeBookmarks)
      .then(data => data.json())
      .then(json => {
        setState(prevState => ({
          ...prevState,
          favouriteRecipes: json,
        }));
        localStorage.setItem('recipes', JSON.stringify(json));
      });
  };

  const getDietFromDB = async () => {
    fetchFoondoApi('GET', apiPaths.userDiet)
      .then(data => data.json())
      .then(json => {
        setState(prevState => ({
          ...prevState,
          selectedDiet: json.diet,
        }));
      });
  };

  const getIntoleranciesFromDB = () => {
    fetchFoondoApi('GET', apiPaths.userIntolerances)
      .then(data => data.json())
      .then(json => {
        setState(prevState => ({
          ...prevState,
          // selectedIntolerances: json.intolerances.map(i => i.value),
          selectedIntolerances: json.intolerances,
        }));
      });
  };

  const getIngredients = async () => {
    fetchFoondoApi('GET', apiPaths.userFridge)
      .then(data => data.json())
      .then(ingredientsArray => {
        setState(prevState => ({
          ...prevState,
          ingredients: ingredientsArray,
        }));
      });
  };

  const sendSingleIngredient = ingredient => fetchFoondoApi('GET', `${apiPaths.foodIngredientsAutocomplete}${ingredient}`)
    .then(data => data.json())
    .then(ingredients => {
      if (ingredients.length > 0) return ingredients[0];
      return undefined;
    })
    .then(ingredientObject => {
      if (!ingredientObject) return undefined;
      return fetchFoondoApi('POST', apiPaths.userFridge, { ingredients: [ingredientObject] })
        .then(() => {
          setState(prevState => ({
            ...prevState,
            ingredients: [
              ...prevState.ingredients,
              ingredientObject,
            ],
          }));
        });
    });

  const deleteSingleIngredient = ingredientId => {
    fetchFoondoApi('DELETE', apiPaths.userFridge, { ingredientIds: [ingredientId] })
      .then(() => {
        setState(prevState => ({
          ...prevState,
          ingredients: state.ingredients.filter(i => i.id !== ingredientId),
        }));
      });
  };

  return (
    <AppContext.Provider value={{
      state,
      handleEmailChange,
      showIngredients,
      showRecipes,
      favouriteRecipe,
      unfavouriteRecipe,
      getBookmarkedRecipes,
      getDietFromDB,
      getIntoleranciesFromDB,
      sendSingleIngredient,
      getIngredients,
      deleteSingleIngredient,
    }}>
      {children}
    </AppContext.Provider>
  );
}

AppContextProvider.propTypes = {
  children: PropTypes.shape({
  }),
};

AppContextProvider.defaultProps = {
  children: {},
};

export { AppContext, AppContextProvider };
