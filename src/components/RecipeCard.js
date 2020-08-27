import React, { useContext, useState } from 'react';
import { Link, Route } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt, faHeart as faSolidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
// import BackButton from './BackButton';
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
  return (
    <div className="recipe-container">
      <div className="image-container">
        <div
          className="bg-image"
          style={{ backgroundImage: `url(${recipe.image})` }} />
      </div>
      <div className="recipe-info">
        <button title="Make me favourite" className="fav-button" type="button" onClick={() => makeRecipeFavourite(recipe)}>
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
        </button>
        <div className="message">
          {state.message}
          {state.message ? <button type="button" onClick={() => { window.location.href = '/cookbook'; }}>My Cookbook</button> : ''}
        </div>
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
          <Link to="/cookbook">
            <button type="button" onClick={() => { unfavouriteRecipe(recipe.id); }}>Delete From Favourites</button>
          </Link>
          <Route
            path="/cookbook" />
        </div>
      </div>
    </div>
  );
}

export default RecipeCard;
