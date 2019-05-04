import React from 'react';
import PropTypes from 'prop-types';
import {MainPage} from '../main-page/main-page.jsx';

const App = (props) => {
  const {rentalObjects} = props;

  return <MainPage rentalObjects={rentalObjects}/>;
};

App.propTypes = {
  rentalObjects: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired
  })).isRequired
};

export {App};
