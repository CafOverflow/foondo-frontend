import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons';
import { AppContext } from './Context';

function SmallIngredientCard(props) {
  const { ingredient } = props;
  const {
    deleteSingleIngredient,
  } = useContext(AppContext);
  return (
    <div className="ingredients-list">
      <img src={ingredient.image} alt={ingredient} />
      {ingredient.measures
      && ingredient.measures.metric.amount
      && ingredient.measures.metric.unitShort ? (
        <>
          {Math.round(ingredient.measures.metric.amount)}
          {' '}
          {ingredient.measures.metric.unitShort}
          {' '}
        </>
        ) : ''}
      {ingredient.name}
      <FontAwesomeIcon icon={faTimesCircle} id="icon-close" className="fa-icon" onClick={() => deleteSingleIngredient(ingredient.id)} />
    </div>
  );
}

SmallIngredientCard.propTypes = {
  ingredient: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string,
    id: PropTypes.string,
    measures: PropTypes.shape({
      metric: PropTypes.shape({
        unitShort: PropTypes.string,
        amount: PropTypes.number,
      }),
    }),
  }),
};

SmallIngredientCard.defaultProps = {
  ingredient: {},
};

export default SmallIngredientCard;
