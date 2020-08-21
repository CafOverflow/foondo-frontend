import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      message: '',
    };
  }

  handleValueChange = event => {
    this.setState({ value: event.target.value });
  }

  handleSubmit = event => {
    const { value } = this.state;
    const { showIngredients } = this.props;
    event.preventDefault();
    if (!value) {
      this.setState({ message: 'Please type something.' });
      return;
    }
    // a function (coming from the props) that calls the backend
    // to add a new item into User's Ingredients table in DB
    showIngredients(value);
    this.setState({ value: '' });
  }

  render() {
    const { value, message } = this.state;
    return (
      <form
        onSubmit={this.handleSubmit}
        className="search-form">
        <div className="div-search">
          <FontAwesomeIcon icon={faSearch} id="iconSearch" className="icon-search" />
          <input
            className="search-term"
            type="text"
            value={value}
            onChange={this.handleValueChange}
            placeholder="Search..." />
        </div>
        <div className="message" name="Message">
          {message}
        </div>
      </form>
    );
  }
}
Search.propTypes = {
  showIngredients: PropTypes.func.isRequired,
};

export default Search;
