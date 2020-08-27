import React, { useContext } from 'react';
import { Link, Route } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import BackButton from './BackButton';
import { AppContext } from './Context';

const filterByID = (id, props) => props.recipes.find(recipe => recipe.id === id);

const getRecipeID = props => {
  const recipeID = props.match.url.slice(9);
  const recipe = filterByID(recipeID, props);
  return recipe;
};

const ingredientList = extendedIngredients => (
  <div>
    <h4>Ingredients</h4>
    <ul className="recipe-ingredients">
      {extendedIngredients.map(ingredient => (
        <li key={ingredient.id}>
          {Math.round(ingredient.measures.metric.amount)}
          {' '}
          {ingredient.measures.metric.unitShort}
          {' '}
          {ingredient.name}
        </li>
      ))}
    </ul>
  </div>
);

const instructionsList = (instructions, sourceUrl) => (
  <div>
    <h4>Detailed Instructions</h4>
    {instructions.map(instruction => (
      <div key={new Date()}>
        <div className="instruction-name">{instruction.name}</div>
        {instruction.steps.map(step => (
          <div key={step.number}>
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
              <span key={ingredient.name}>
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
    <a href={sourceUrl}>
      <FontAwesomeIcon
        icon={faExternalLinkAlt}
        id="icon-external-link"
        className="icon-external-link" />
    </a>
  </div>
);

function RecipeCard(props) {
  const { favouriteRecipe, unfavouriteRecipe } = useContext(AppContext);
  const recipe = getRecipeID(props);
  return (
    <div className="recipe-container">
      <Link to="/recipes"><BackButton /></Link>
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
        {recipe.extendedIngredients && ingredientList(recipe.extendedIngredients)}
        {recipe.analyzedInstructions
        && instructionsList(recipe.analyzedInstructions, recipe.sourceUrl)}

        <div className="tags-container">
          {recipe.dishTypes && recipe.dishTypes.map(type => (
            <span key={type}>{type}</span>
          ))}
        </div>
        <div className="buttons-container">
          <button type="button" onClick={() => { favouriteRecipe(recipe); }}>Add to Favourites</button>
          <Link to="/recipes">
            <button type="button" onClick={() => { unfavouriteRecipe(recipe.id); }}>Delete From Favourites</button>
          </Link>
          <Route
            path="/recipes" />
        </div>
      </div>
    </div>
  );
}

export default RecipeCard;
