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

  // const deleteIngredient = ingredient => {
  //   setState(prevState => ({
  //     ...prevState,
  //     ingredients: prevState.ingredients.filter(i => i !== ingredient),
  //   }));
  // };

  const showRecipes = recipe => {
    setState(prevState => ({
      ...prevState,
      recipes: recipe,
    }));
  };

  const favouriteRecipe = recipe => {
    const jwt = localStorage.getItem('jwt');
    const recipeForFetch = {
      recipe,
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

  const getBookmarkedRecipes = () => {
    const jwt = localStorage.getItem('jwt');
    fetch('http://localhost:3001/recipes/bookmarks/', {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    })
      .then(data => data.json())
      .then(json => {
        setState(prevState => ({
          ...prevState,
          favouriteRecipes: json,
        }));
      });
  };

  const getDietFromDB = async () => {
    const jwt = localStorage.getItem('jwt');
    await fetch('http://localhost:3001/user/diet', {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    })
      .then(data => data.json())
      .then(json => {
        setState(prevState => ({
          ...prevState,
          selectedDiet: json.diet.replace(/ /g, ''),
        }));
      });
  };

  const getIntoleranciesFromDB = () => {
    const jwt = localStorage.getItem('jwt');
    fetch('http://localhost:3001/user/intolerances', {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    })
      .then(data => data.json())
      .then(json => {
        setState(prevState => ({
          ...prevState,
          selectedIntolerances: json.intolerances.map(i => i.value),
        }));
      });
  };

  const getIngredients = async () => {
    const jwt = localStorage.getItem('jwt');
    await fetch('http://localhost:3001/user/fridge', {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    })
      .then(data => data.json())
      .then(ingredientsArray => {
        setState(prevState => ({
          ...prevState,
          ingredients: ingredientsArray,
        }));
      });
  };

  const sendSingleIngredient = ingredient => {
    const jwt = localStorage.getItem('jwt');
    fetch(`http://localhost:3001/food/ingredients/autocomplete/${ingredient}`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    })
      .then(data => data.json())
      .then(ingredients => ingredients[0])
      .then(ingredientObject => {
        fetch('http://localhost:3001/user/fridge', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwt}`,
          },
          body: JSON.stringify({ ingredients: [ingredientObject] }),
        }).then(() => {
          setState(prevState => ({
            ...prevState,
            ingredients: [
              ...prevState.ingredients,
              ingredientObject,
            ],
          }));
        });
      });
  };

  const deleteSingleIngredient = ingredientId => {
    const jwt = localStorage.getItem('jwt');
    fetch('http://localhost:3001/user/fridge', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify({ ingredientIds: [ingredientId] }),
    })
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
      // deleteIngredient,
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
