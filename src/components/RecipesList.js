import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import SmallRecipeCard from './SmallRecipeCard';
import RecipeCard from './RecipeCard';
import BackButton from './BackButton';

function RecipesList(mainProps) {
  const { recipes } = mainProps;

  if (recipes && recipes.length > 0) {
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
                  recipes={recipes} />
              )} />
          </Switch>
          <div className="recipes-wrapper">
            {recipes && recipes
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

RecipesList.propTypes = {
  recipes: PropTypes.instanceOf(Array),
};

RecipesList.defaultProps = {
  recipes: [],
};

export default RecipesList;
