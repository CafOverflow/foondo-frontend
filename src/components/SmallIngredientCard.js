import React from 'react';
import PropTypes from 'prop-types';

function SmallIngredientCard(props) {
  const { ingredient } = props;
  return (
    <div className="ingredients-list">
      {ingredient}
    </div>
  );
}

SmallIngredientCard.propTypes = {
  ingredient: PropTypes.string.isRequired,
};

export default SmallIngredientCard;
