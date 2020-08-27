/* eslint-disable eqeqeq */
/* eslint-disable react/no-array-index-key */
import React, { useContext, useEffect, useState } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import Header from './Header';
import { AppContext } from './Context';
import { fetchFoondoApi, apiPaths } from './FoondoApi';

const diets = [
  { value: 'None', label: 'None' },
  { value: 'Ketogenic', label: 'Ketogenic' },
  { value: 'Vegetarian', label: 'Vegetarian' },
  { value: 'Lacto-Vegetarian', label: 'Lacto-Vegetarian' },
  { value: 'Ovo-Vegetarian', label: 'Ovo-Vegetarian' },
  { value: 'Vegan', label: 'Vegan' },
  { value: 'Pescetarian', label: 'Pescetarian' },
  { value: 'Paleo', label: 'Paleo' },
  { value: 'Primal', label: 'Primal' },
  { value: 'Whole30', label: 'Whole30' },
];

const intolerances = [
  { value: 'Dairy', label: 'Dairy' },
  { value: 'Egg', label: 'Egg' },
  { value: 'Gluten', label: 'Gluten' },
  { value: 'Grain', label: 'Grain' },
  { value: 'Peanut', label: 'Peanut' },
  { value: 'Vegan', label: 'Vegan' },
  { value: 'Seafood', label: 'Seafood' },
  { value: 'Shellfish', label: 'Shellfish' },
  { value: 'Soy', label: 'Soy' },
  { value: 'Sulfite', label: 'Sulfite' },
  { value: 'Wheat', label: 'Wheat' },
  { value: 'Tree Nut', label: 'Tree Nut' },
];

const animatedComponents = makeAnimated();

function Diet() {
  const {
    state, getDietFromDB, getIntoleranciesFromDB,
  } = useContext(AppContext);

  const [dietState, setDiet] = useState({
    selectedDiet: null,
  });

  const [intolerancesState, setIntolerances] = useState({
    selectedIntolerances: null,
  });

  const handleChangeDiet = selectedDiet => {
    setDiet(
      selectedDiet,
    );
  };

  const saveDiet = selectedDiet => {
    if (selectedDiet[0]) {
      const diet = selectedDiet[0].value;
      fetchFoondoApi('POST', apiPaths.userDiet, { diet });
      window.location.reload(false);
    }
  };

  const handleChangeIntolerancies = selectedIntolerances => {
    setIntolerances(
      selectedIntolerances,
    );
  };

  const saveIntolerances = () => {
    fetchFoondoApi('POST', apiPaths.userIntolerances, { intolerances: intolerancesState });
    window.location.reload(false);
  };

  useEffect(() => {
    getDietFromDB();
    getIntoleranciesFromDB();
    return () => {
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="wrapper">
      <header className="header">
        <Header />
      </header>
      <h1>Diet</h1>
      <div className="page-wrapper">
        <div className="diet-select">
          <div className="diet-header">Choose your diet</div>
          <div className="diet-dropdown">
            <Select
              closeMenuOnSelect={false}
              components={animatedComponents}
              isMulti
              onChange={handleChangeDiet}
              options={diets} />
            <button type="button" className="default-button" onClick={saveDiet(dietState)}>Save</button>
          </div>
          <div>My diet:</div>
          {typeof state.selectedDiet === 'string' ? <p>{state.selectedDiet}</p> : ''}
        </div>
        <div className="diet-select">
          <div className="diet-header">Choose your intolerances</div>
          <div className="diet-dropdown">
            <Select
              closeMenuOnSelect={false}
              components={animatedComponents}
              isMulti
              onChange={handleChangeIntolerancies}
              options={intolerances} />
            <button type="button" className="default-button" onClick={saveIntolerances}>Save</button>
          </div>
          <div>My Intolerancies:</div>
          { state.selectedIntolerances.length === 0 || typeof state.selectedIntolerances == 'undefined' ? '' : state.selectedIntolerances.map((option, index) => <p key={index}>{option.value}</p>)}
        </div>
      </div>
    </div>
  );
}

export default Diet;
