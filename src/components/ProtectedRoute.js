import React from 'react';
import {
  Route,
  Redirect,
} from 'react-router-dom';
import PropTypes from 'prop-types';

function ProtectedRoute({ Component }) {
  return (
    <Route
      render={() => (
        localStorage.getItem('jwt')
          ? <Component />
          : <Redirect to="/login" />
      )} />
  );
}

ProtectedRoute.propTypes = {
  Component: PropTypes.func.isRequired,
};

export default ProtectedRoute;
