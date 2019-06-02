import React from "react";
import PropTypes from "prop-types";

import CITIES from '../../cities.js';
import CityItem from '../city-item/city-item.jsx';

const CitiesList = (props) => {
  const {activeItem, setActiveItem} = props;
  return (<section className="locations container">
    <ul className="locations__list tabs__list">
      {Object.keys(CITIES).map((city) =>
        <CityItem
          city = {city}
          isActiveCity = {city === activeItem}
          handleCityClick = {props.handleCityClick}
          setActiveItem = {setActiveItem}
          key={city}
        />
      )}
    </ul>
  </section>);
};


CitiesList.propTypes = {
  handleCityClick: PropTypes.func.isRequired,
  setActiveItem: PropTypes.func.isRequired,
  activeItem: PropTypes.string.isRequired,
};

export default CitiesList;
