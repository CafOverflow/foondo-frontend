import React, { Component } from 'react';
import Search from './Search';
import IngredientsList from './IngredientsList';
import RecipesList from './RecipesList';
import BackButton from './BackButton';

class Fridge extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showComponent: false,
      ingredients: [],
      recipes: [],
    };
  }

  // make a request to backend that calls the API to load results of relevant recipes
  // result: RecipesList component to be rendered with data from the response from backend
  showIngredients = ingredient => {
    this.setState(prevState => ({
      ingredients: [
        ...prevState.ingredients,
        ingredient,
      ],
    }));
  }

  fetchRecipesByIngredients = async () => {
    const { ingredients } = this.state;
    const query = ingredients.join();
    await fetch(`http://localhost:3001/recipes/complexSearch?query=${query}`)
      .then(data => data.json())
      .then(json => {
        this.setState({ recipes: json });
      });
    this.setState({
      showComponent: true,
    });
  }

  render() {
    const { showComponent, ingredients, recipes } = this.state;
    return (
      <div className="fridge-wrapper">
        <header className="fridge-header">
          <BackButton />
          <h1>My Fridge</h1>
        </header>
        {/* pass to the Search component a function
        as a prop that will handle the request to backend (+request to API)
         to load the list of the relevant ingredients
         + create button that will add an ingredient to the DB */}
        <Search showIngredients={this.showIngredients} />
        {/* ingredients list component should be rendered with data from DB */}
        <IngredientsList ingredients={ingredients} />
        <button
          onClick={this.fetchRecipesByIngredients}
          type="button"
          className="fridge-button">
          I want to cook!
        </button>
        {showComponent
          ? <RecipesList recipes={recipes} />
          : null}
        <RecipesList recipes={recipes} />
      </div>
    );
  }
}

export default Fridge;
