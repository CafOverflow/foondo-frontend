/* eslint-disable react/no-danger */
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import BackButton from './BackButton';

const filterByID = (id, props) => props.recipes.find(recipe => recipe.id === Number(id));

const getRecipeID = props => {
  const recipeID = props.match.url.slice(9);
  const recipe = filterByID(recipeID, props);
  return recipe;
};

function RecipeCard(props) {
  const recipe = getRecipeID(props);
  // const { summary } = recipe;
  return (
    <div className="recipe-container">
      <BackButton />
      <div className="image-container">
        <div
          className="bg-image"
          style={{ backgroundImage: `url(${recipe.image})` }} />
      </div>
      <div className="recipe-info">
        <div>
          <h3>{recipe.title}</h3>
          <small>
            <span>Cooking Time: </span>
            {recipe.readyInMinutes}
            <span> min</span>
          </small>
          <br />
          <small>
            <span>Servings: </span>
            {recipe.servings}
          </small>
        </div>
        {recipe.summary
          && <p dangerouslySetInnerHTML={{ __html: recipe.summary }} />}
        {recipe.extendedIngredients
          && <h4>Ingredients</h4>}
        <ul className="recipe-ingredients">
          {recipe.extendedIngredients && recipe.extendedIngredients.map(ingredient => (
            <li>
              {Math.round(ingredient.measures.metric.amount)}
              {' '}
              {ingredient.measures.metric.unitShort}
              {' '}
              {ingredient.name}
            </li>
          ))}
        </ul>
        <div>
          {recipe.analyzedInstructions.length > 0
          && <h4>Detailed Instructions</h4>}
          {recipe.analyzedInstructions && recipe.analyzedInstructions.map(instruction => (
            <div>
              <div className="instruction-name">{instruction.name}</div>
              {instruction.steps.map(step => (
                <div>
                  <br />
                  <div>
                    <b>
                      <span>Step number </span>
                      <span>
                        {step.number}
                        .
                      </span>
                    </b>
                  </div>
                  {step.step}
                  <br />
                  <br />
                  {step.ingredients.length > 0
          && <span><i>Ingredients for this step: </i></span>}
                  {step.ingredients.map(ingredient => (
                    <span>
                      {ingredient.name}
                      {', '}
                    </span>
                  ))}
                  <br />
                </div>
              ))}
            </div>
          ))}
          <span>Read the detailed instructions</span>
          <a href={recipe.sourceUrl}>
            <FontAwesomeIcon
              icon={faExternalLinkAlt}
              id="icon-external-link"
              className="icon-external-link" />
          </a>
        </div>
        <div className="tags-container">
          {recipe.dishTypes && recipe.dishTypes.map(type => (
            <span key={type}>{type}</span>
          ))}
        </div>
        {/* add functionality to buttons to save a recipe as favourite in DB and delete */}
        <div className="buttons-container">
          <button type="button">Add to Favourites</button>
          <button type="button">Delete From Favourites</button>
        </div>
      </div>
    </div>
  );
}
RecipeCard.propTypes = {
  recipe: PropTypes.shape({
    sourceUrl: PropTypes.string,
    image: PropTypes.string,
    title: PropTypes.string,
    author: PropTypes.string,
    readyInMinutes: PropTypes.number,
    servings: PropTypes.number,
    summary: PropTypes.string,
    // eslint-disable-next-line react/forbid-prop-types
    extendedIngredients: PropTypes.array,
    // eslint-disable-next-line react/forbid-prop-types
    dishTypes: PropTypes.array,
  }),
};

RecipeCard.defaultProps = {
  recipe: {},
};

export default RecipeCard;
