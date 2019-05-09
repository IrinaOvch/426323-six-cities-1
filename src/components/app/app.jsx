import React from 'react';
import PropTypes from 'prop-types';
import MainPage from '../main-page/main-page.jsx';

const App = (props) => {
  const {rentalObjects, onOfferTitleClick} = props;

  return <MainPage
    rentalObjects={rentalObjects}
    onOfferTitleClick={onOfferTitleClick}
  />;
};

App.propTypes = {
  rentalObjects: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired
  })).isRequired,
  onOfferTitleClick: PropTypes.func.isRequired,
};

export default App;
