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
    userName: null,
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
    const jwt = localStorage.getItem('jwt');
    const recipeForFetch = {
      recipe: {
        id: recipe.id,
        title: recipe.title,
        sourceUrl: recipe.sourceUrl,
        image: recipe.image,
      },
    };
    fetch('http://localhost:3001/recipes/bookmarks/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify(recipeForFetch),
    })
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
    const jwt = localStorage.getItem('jwt');
    fetch(`http://localhost:3001/recipes/bookmarks/${recipeId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    })
      .then(() => {
        setState(prevState => ({
          ...prevState,
          favouriteRecipes: prevState.favouriteRecipes.filter(r => r.id !== recipeId),
        }));
      });
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
      handleEmailChange,
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
