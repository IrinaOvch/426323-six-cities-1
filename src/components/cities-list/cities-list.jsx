import React from "react";
import PropTypes from "prop-types";

import CITIES from '../../cities.js';

const CitiesList = (props) => {
  const {activeCity, handleCityClick} = props;
  return (<section className="locations container">
    <ul className="locations__list tabs__list">
      {Object.keys(CITIES).map((city) =>
        <li className="locations__item" key={city}>
          <a className={`locations__item-link tabs__item ${(city === activeCity) ? `tabs__item--active` : ``}`} onClick={() => {
            handleCityClick(city);
          }} href="#">
            <span>{city}</span>
          </a>
        </li>
      )}
    </ul>
  </section>);
};

CitiesList.propTypes = {
  activeCity: PropTypes.string.isRequired,
  handleCityClick: PropTypes.func.isRequired,
};

export default CitiesList;
