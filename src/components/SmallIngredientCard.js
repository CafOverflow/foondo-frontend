import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { AppContext } from './Context';

function SmallIngredientCard(props) {
  const { ingredient } = props;
  const {
    deleteSingleIngredient,
  } = useContext(AppContext);
  return (
    <div className="ingredients-list">
      {ingredient.name}
      <img src={ingredient.image} alt={ingredient} />
      <button type="button" onClick={() => deleteSingleIngredient(ingredient.id)}>x</button>
    </div>
  );
}

SmallIngredientCard.propTypes = {
  ingredient: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string,
    id: PropTypes.string,
  }),
};

SmallIngredientCard.defaultProps = {
  ingredient: {},
};

export default SmallIngredientCard;
