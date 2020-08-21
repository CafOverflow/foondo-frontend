/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import SmallRecipeCard from './SmallRecipeCard';
import RecipeCard from './RecipeCard';
import BackButton from './BackButton';

// eslint-disable-next-line react/prefer-stateless-function
class RecipesList extends Component {
  render() {
    const { recipes } = this.props;
    if (recipes) {
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
              {recipes.map(recipe => <SmallRecipeCard recipe={recipe} key={recipe.id} />)}
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
}
RecipesList.propTypes = {
  recipes: PropTypes.shape([
  ]),
};

RecipesList.defaultProps = {
  recipes: [],
};

export default RecipesList;
