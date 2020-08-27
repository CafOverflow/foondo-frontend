const getApiUrl = () => process.env.REACT_APP_FOONDO_BACKEND;
const getJWT = () => localStorage.getItem('jwt');

const getHeaders = () => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${getJWT()}`,
});

const login = credentials => {
  const request = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  };
  const uri = `${getApiUrl()}login`;
  return fetch(uri, request);
};

const fetchFoondoApi = (method, path, params) => {
  const request = {
    method,
    headers: getHeaders(),
  };
  if (params) {
    request.body = JSON.stringify(params);
  }
  const uri = `${getApiUrl()}${path}`;
  return fetch(uri, request);
};

const apiPaths = {
  user: 'user/',
  recipeBookmarks: 'recipes/bookmarks/',
  userDiet: 'user/diet/',
  userIntolerances: 'user/intolerances/',
  userFridge: 'user/fridge/',
  foodIngredientsAutocomplete: 'food/ingredients/autocomplete/',
  recipesComplexSearch: 'recipes/complexSearch/',
};

module.exports = {
  fetchFoondoApi,
  apiPaths,
  login,
};
