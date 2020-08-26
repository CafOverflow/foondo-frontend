import React from 'react';
import {
  Link,
} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import PropTypes from 'prop-types';

function SmallRecipeCard(mainProps) {
  const { recipe } = mainProps;
  return (
    <section className="recipe-list">
      <Link to={`/recipes/${recipe.id}`}>
        <article>
          <img className="recipe-image" src={recipe.image} alt={recipe.title} />
          <div className="recipe-title">
            <span>
              {recipe.title}
            </span>
          </div>
          {recipe.readyInMinutes && recipe.servings && (
            <div className="recipe-info">
              <span className="recipe-servings">
                Servings:
                {` ${recipe.servings}`}
              </span>
              <span className="recipe-time">
                <FontAwesomeIcon icon={faClock} id="icon-clock" className="fa-icon" />
                {recipe.readyInMinutes}
                min
              </span>
            </div>
          )}
        </article>
      </Link>
    </section>
  );
}

SmallRecipeCard.propTypes = {
  recipe: PropTypes.shape({
    sourceUrl: PropTypes.string,
    image: PropTypes.string,
    title: PropTypes.string,
    author: PropTypes.string,
    readyInMinutes: PropTypes.number,
    servings: PropTypes.number,
    id: PropTypes.string,
  }),
};

SmallRecipeCard.defaultProps = {
  recipe: {},
};

export default SmallRecipeCard;
