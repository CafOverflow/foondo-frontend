import React from 'react';
import {
  Link,
} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGripLinesVertical } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

function SmallRecipeCard(mainProps) {
  const { recipe } = mainProps;
  return (
    <section className="recipe-list">
      <Link to={`/recipes/${recipe.id}`}>
        <article>
          <img className="recipe-image" src={recipe.image} alt={recipe.title} />
          <h2>
            <FontAwesomeIcon icon={faGripLinesVertical} id="icon-arrow" className="icon-arrow" />
            {recipe.title}
          </h2>
          {recipe.readyInMinutes && recipe.servings && (
            <div className="recipe-info">
              <span className="recipe-time">
                Cooking Time:
                {recipe.readyInMinutes}
                min
              </span>
              <br />
              <span className="recipe-servings">
                Servings:
                {recipe.servings}
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
    id: PropTypes.number,
  }),
};

SmallRecipeCard.defaultProps = {
  recipe: {},
};

export default SmallRecipeCard;
