import React from 'react';
import PropTypes from "prop-types";

import CitiesList from '../cities-list/cities-list.jsx';
import withActiveItem from '../../hocs/with-active-item/with-active-item.jsx';
import {initialState} from '../../reducer/cities/cities.js';

const CitiesListWrapper = withActiveItem(initialState.city)(CitiesList);


const MainPageEmpty = ({onCityClick, activeCity}) => {
  return <main className="page__main page__main--index page__main--index-empty">
    <h1 className="visually-hidden">Cities</h1>
    <div className="cities tabs">
      <CitiesListWrapper onCityClick={onCityClick}/>
    </div>
    <div className="cities__places-wrapper">
      <div className="cities__places-container cities__places-container--empty container">
        <section className="cities__no-places">
          <div className="cities__status-wrapper tabs__content">
            <b className="cities__status">No places to stay available</b>
            <p className="cities__status-description">We could not find any property available at the moment in {activeCity}</p>
          </div>
        </section>
        <div className="cities__right-section">
        </div>
      </div>
    </div>
  </main>;
};

MainPageEmpty.propTypes = {
  onCityClick: PropTypes.func.isRequired,
  activeCity: PropTypes.string.isRequired,
};

export default MainPageEmpty;
