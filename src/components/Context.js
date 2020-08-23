import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

const AppContext = createContext();
function AppContextProvider({ children }) {
  const [state, setState] = useState({
    ingredients: [],
    recipes: [],
    favouriteRecipes: [],
    selectedDiet: null,
    selectedIntolerances: null,
  });
  const showIngredients = ingredient => {
    setState(prevState => ({
      ...prevState,
      ingredients: [
        ...prevState.ingredients,
        ingredient,
      ],
    }));
  };

  const deleteIngredient = ingredient => {
    setState(prevState => ({
      ...prevState,
      ingredients: prevState.ingredients.filter(i => i !== ingredient),
    }));
  };

  const showRecipes = recipe => {
    setState(prevState => ({
      ...prevState,
      recipes: recipe,
    }));
  };

  const favouriteRecipe = recipe => {
    setState(prevState => ({
      ...prevState,
      favouriteRecipes: [
        ...prevState.favouriteRecipes,
        recipe,
      ],
    }));
  };

  const unfavouriteRecipe = recipe => {
    setState(prevState => ({
      ...prevState,
      favouriteRecipes: prevState.favouriteRecipes.filter(r => r.id !== recipe.id),
    }));
  };

  const handleChangeDiet = selectedDiet => {
    setState(prevState => ({
      ...prevState,
      selectedDiet,
    }));
  };

  const handleChangeIntolerancies = selectedIntolerances => {
    setState(prevState => ({
      ...prevState,
      selectedIntolerances,
    }));
  };

  return (
    <AppContext.Provider value={{
      state,
      showIngredients,
      showRecipes,
      handleChangeDiet,
      handleChangeIntolerancies,
      deleteIngredient,
      favouriteRecipe,
      unfavouriteRecipe,
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
