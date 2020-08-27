import React, { useContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt, faHeart as faSolidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { AppContext } from './Context';
import IngredientsList from './IngredientsList';

const filterByID = (id, props) => props.recipes.find(recipe => recipe.id === id);

const getRecipeID = props => {
  const recipeID = props.match.url.slice(9);
  const recipe = filterByID(recipeID, props);
  return recipe;
};

const ingredientList = extendedIngredients => (
  <div>
    <h4>Ingredients</h4>
    <IngredientsList ingredients={extendedIngredients} />
  </div>
);

const instructionsList = (instructions, sourceUrl) => (
  <div className="instructions">
    <h4>Detailed Instructions</h4>
    {instructions.map(instruction => (
      <div key={new Date()}>
        <div className="instruction-name">{instruction.name}</div>
        {instruction.steps.map(step => (
          <div key={step.number} className="instruction-step">
            <div className="instruction-step-name">
              <span>Step </span>
              {step.number}
            </div>
            <div className="instruction-text">{step.step}</div>
            {step.ingredients.length > 0
              && <span><i>Ingredients: </i></span>}
            {step.ingredients.map(ingredient => (
              <span key={ingredient.name}>
                {ingredient.name}
                {', '}
              </span>
            ))}
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

  const [state, setState] = useState({
    messge: '',
  });

  const makeRecipeUnfavourite = id => {
    unfavouriteRecipe(id);
    window.location.href = '/cookbook';
  };

  const makeRecipeFavourite = id => {
    favouriteRecipe(id);
    setState({
      message: 'Added to your favourite!',
    });
  };

  const recipe = getRecipeID(props);

  window.scrollTo(0, 0);

  return (
    <div className="recipe-container">
      <div className="image-container">
        <div
          className="bg-image"
          style={{ backgroundImage: `url(${recipe.image})` }} />
      </div>
      <div className="recipe-info">

        <button title="Make me favourite" className="fav-button" type="button" onClick={() => makeRecipeFavourite(recipe)}>
          <span className="fav">Make me favourite</span>
          <FontAwesomeIcon
            icon={faSolidHeart}
            id="icon-external-link"
            className="icon-external-link" />
        </button>
        <button title="Make me unfavourite" className="fav-button" type="button" onClick={() => makeRecipeUnfavourite(recipe.id)}>
          <FontAwesomeIcon
            icon={faHeart}
            id="icon-external-link"
            className="icon-external-link" />
          <span className="unfav">Make me unfavourite</span>
        </button>

        <div className="message">
          {state.message}
          {state.message ? <button type="button" onClick={() => { window.location.href = '/cookbook'; }}>My Cookbook</button> : ''}
        </div>
        <div>
          <h3>{recipe.title}</h3>
          <div className="tags-container">
            {recipe.dishTypes && recipe.dishTypes.map(type => (
              <span key={type}>{type}</span>
            ))}
          </div>
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
      </div>
    </div>
  );
}

export default RecipeCard;
