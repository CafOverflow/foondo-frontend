import React from 'react';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretSquareLeft } from '@fortawesome/free-solid-svg-icons';

const BackButton = () => {
  const history = useHistory();
  return (
    <button className="back-button" type="button" onClick={() => history.goBack()}>
      <FontAwesomeIcon
        icon={faCaretSquareLeft}
        id="icon-arrow"
        className="icon-arrow" />
    </button>
  );
};

export default BackButton;
