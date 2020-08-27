import React from 'react';
import PropTypes from 'prop-types';
import SmallIngredientCard from './SmallIngredientCard';

function IngredientsList(props) {
  const { ingredients } = props;
  if (ingredients.length > 0) {
    return (
      <div>
        <div className="ingredients-wrapper">
          <h4>My Ingredients</h4>
          {ingredients.map(ingredient => (
            <SmallIngredientCard
              ingredient={ingredient}
              key={ingredient.id} />
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className="recipes-wrapper">
      <div>No ingredients yet</div>
    </div>
  );
}

IngredientsList.propTypes = {
  ingredients: PropTypes.instanceOf(Array),
};

IngredientsList.defaultProps = {
  ingredients: [],
};

export default IngredientsList;
