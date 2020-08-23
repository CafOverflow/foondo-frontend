import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { AppContext } from './Context';

function SmallIngredientCard(props) {
  const { ingredient } = props;
  const {
    deleteIngredient,
  } = useContext(AppContext);
  return (
    <div className="ingredients-list">
      {ingredient}
      <button type="button" onClick={() => deleteIngredient(ingredient)}>x</button>
    </div>
  );
}

SmallIngredientCard.propTypes = {
  ingredient: PropTypes.string.isRequired,
};

export default SmallIngredientCard;
