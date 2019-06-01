import React from "react";
import PropTypes from "prop-types";

import CITIES from '../../cities.js';
import CityItem from '../city-item/city-item.jsx';

const CitiesList = (props) => {
  const {activeCity} = props;
  return (<section className="locations container">
    <ul className="locations__list tabs__list">
      {Object.keys(CITIES).map((city) =>
        <CityItem
          city = {city}
          isActiveCity = {city === activeCity}
          handleCityClick = {props.handleCityClick}
          key={city}
        />
      )}
    </ul>
  </section>);
};


CitiesList.propTypes = {
  activeCity: PropTypes.string.isRequired,
  handleCityClick: PropTypes.func.isRequired,
};

export default CitiesList;
