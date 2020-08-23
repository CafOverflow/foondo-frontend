/* eslint-disable react/no-array-index-key */
import React, { useContext } from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
} from 'react-router-dom';
import SmallRecipeCard from './SmallRecipeCard';
import RecipeCard from './RecipeCard';
import BackButton from './BackButton';
import { AppContext } from './Context';

// eslint-disable-next-line react/prefer-stateless-function
function RecipesList() {
  const {
    state,
  } = useContext(AppContext);
  if (state.recipes) {
    return (
      <BrowserRouter>
        <div className="recipes-wrapper">
          <BackButton />
          <Switch>
            <Route
              path="/recipes/:id"
              render={props => (
                <RecipeCard
                    // eslint-disable-next-line react/jsx-props-no-spreading
                  {...props}
                  recipes={state.recipes.recipes} />
              )} />
          </Switch>
          <div className="recipes-wrapper">
            {state.recipes.recipes && state.recipes.recipes
              .map(recipe => <SmallRecipeCard recipe={recipe} key={recipe.id} />)}
          </div>
        </div>
      </BrowserRouter>
    );
  }
  return (
    <div>
      <div className="recipes-wrapper">
        <div>No recipes yet</div>
      </div>
    </div>
  );
}

export default RecipesList;
