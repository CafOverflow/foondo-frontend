import React, { useContext } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import BackButton from './BackButton';
import { AppContext } from './Context';

// or provide option from DB
const diets = [
  { value: 'Gluten Free', label: 'Gluten Free' },
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
    state, handleChangeDiet, handleChangeIntolerancies,
  } = useContext(AppContext);

  // create a function that will sent the infomation to DB
  const saveDiet = () => {

  };

  const saveIntolerances = () => {

  };

  return (
    <div className="diet-wrapper">
      <header className="diet-header">
        <BackButton />
        <h1>Diet</h1>
      </header>
      <div>Choose your diet</div>
      {/* set the diet preferences for a user in DB and use them with every API call
      Every API endpoint asking for an diet parameter can be fed with any of these diets. */}
      <div className="diet-dropdown">
        <Select
          closeMenuOnSelect={false}
          components={animatedComponents}
          isMulti
          onChange={handleChangeDiet}
          options={diets} />
        <button type="button" className="diet-button" onClick={saveDiet}>Save</button>
      </div>
      <div>My diet:</div>
      <div>
        {state.selectedDiet && state.selectedDiet
          .map(option => <p>{option.value}</p>)}
      </div>
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
      </div>
      <div>My Intolerancies:</div>
      <div>
        {state.selectedIntolerances && state.selectedIntolerances
          .map(option => <p>{option.value}</p>)}
      </div>
    </div>
  );
}

export default Diet;
