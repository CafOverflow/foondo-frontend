import React, { useContext, useEffect, useState } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import BackButton from './BackButton';
import { AppContext } from './Context';

const diets = [
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
      const jwt = localStorage.getItem('jwt');
      fetch('http://localhost:3001/user/diet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify({
          diet,
        }),
      });
    }
  };

  const handleChangeIntolerancies = selectedIntolerances => {
    setIntolerances(
      selectedIntolerances,
    );
  };

  const saveIntolerances = () => {
    const jwt = localStorage.getItem('jwt');
    fetch('http://localhost:3001/user/intolerances', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify({
        intolerances: intolerancesState,
      }),
    });
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
        <BackButton />
        <h1>Diet</h1>
      </header>
      <div className="page-wrapper">
        <div>Choose your diet</div>
        <div className="diet-dropdown">
          <Select
            closeMenuOnSelect={false}
            components={animatedComponents}
            isMulti
            onChange={handleChangeDiet}
            options={diets} />
          <button type="button" className="diet-button" onClick={saveDiet(dietState)}>Save</button>
          <button type="button" className="diet-button" onClick={() => window.location.reload()}>Update</button>
        </div>
        <div>My diet:</div>
        {state.selectedDiet && state.selectedDiet}
        <br />
        <div>Choose your intolerances</div>
        <div className="diet-dropdown">
          <Select
            closeMenuOnSelect={false}
            components={animatedComponents}
            isMulti
            onChange={handleChangeIntolerancies}
            options={intolerances} />
          <button type="button" className="diet-button" onClick={saveIntolerances}>Save</button>
          <button type="button" className="diet-button" onClick={() => window.location.reload()}>Update</button>
        </div>
        <div>My Intolerancies:</div>
        {state.selectedIntolerances
        && state.selectedIntolerances.join()}
      </div>
    </div>
  );
}

export default Diet;
