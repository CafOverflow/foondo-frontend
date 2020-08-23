import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

const AppContext = createContext();
function AppContextProvider({ children }) {
  const [state, setState] = useState({
    ingredients: [],
    recipes: [],
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

  const showRecipes = recipe => {
    setState(prevState => ({
      ...prevState,
      recipes: [
        ...prevState.recipes,
        recipe,
      ],
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
      state, showIngredients, showRecipes, handleChangeDiet, handleChangeIntolerancies,
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
