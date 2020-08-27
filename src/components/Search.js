import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { AppContext } from './Context';

function Search(props) {
  const { placeholder } = props;
  const { fetchRecipes } = props;
  const [state, setState] = useState({
    value: '',
    message: '',
  });

  const {
    sendSingleIngredient,
  } = useContext(AppContext);

  const handleValueChange = event => {
    setState({ value: event.target.value });
  };

  const handleSubmit = event => {
    const { value } = state;
    event.preventDefault();
    if (!value) {
      setState({ message: 'Please type something.' });
      return;
    }
    // a function (coming from the props) that calls the backend
    // to add a new item into User's Ingredients table in DB
    if (placeholder === 'a recipe') {
      fetchRecipes(value);
    } else {
      sendSingleIngredient(value)
        .then(kappa => { if (!kappa) setState({ message: 'No matching ingredient found. ' }); });
    }
    setState({ value: '' });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="search-form">
      <div className="div-search">
        <FontAwesomeIcon icon={faSearch} id="iconSearch" className="icon-search" />
        <input
          className="search-term"
          type="search"
          value={state.value}
          onChange={handleValueChange}
          placeholder={`find ${placeholder}...`} />
      </div>
      <div className="message" name="Message">
        {state.message}
      </div>
    </form>
  );
}

Search.propTypes = {
  placeholder: PropTypes.string.isRequired,
  fetchRecipes: PropTypes.func.isRequired,
};

export default Search;
