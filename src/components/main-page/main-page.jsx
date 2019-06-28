import React from 'react';
import PropTypes from 'prop-types';

import OffersList from '../offers-list/offers-list.jsx';
import CitiesList from '../cities-list/cities-list.jsx';
import Map from '../map/map.jsx';
import mapData from '../../mocks/map-data.js';
import withActiveItem from '../../hocs/with-active-item/with-active-item.jsx';
import withDropdown from '../../hocs/with-dropdown/with-dropdown.jsx';
import {initialState} from '../../reducer/cities/cities.js';
import Offer from '../../types/offer-type.js';
import SortingOptions from '../sorting-options/sorting-options.jsx';
import Header from '../header/header.jsx';

const OffersListWrapper = withActiveItem()(OffersList);
const CitiesListWrapper = withActiveItem(initialState.city)(CitiesList);
const SortingOptionsWrapper = withDropdown(false)(SortingOptions);

const sortingFunctions = {
  "Popular": (a, b) => a.id - b.id,
  "Price: low to high": (a, b) => a.price - b.price,
  "Price: high to low": (a, b) => b.price - a.price,
  "Top rated first": (a, b) => b.rating - a.rating
};

const MainPage = (props) => {
  const {offers, leaflet, activeCity, onCityClick, userProfile, currentSortType, onChangeSortType} = props;

  const sortedOffers = offers.sort(sortingFunctions[currentSortType]);
  return (
  <>
    <Header userProfile={userProfile}/>

    <main className="page__main page__main--index">
      <h1 className="visually-hidden">Cities</h1>
      <div className="cities tabs">
        <CitiesListWrapper onCityClick={onCityClick}/>
      </div>
      <div className="cities__places-wrapper">
        <div className="cities__places-container container">
          <section className="cities__places places">
            <h2 className="visually-hidden">Places</h2>
            <b className="places__found">{offers.length} places to stay in {activeCity}</b>
            <SortingOptionsWrapper currentSortType={currentSortType} onSelect={onChangeSortType}/>
            <OffersListWrapper offers={sortedOffers}/>
          </section>
          <div className="cities__right-section">
            <Map
              mapData={mapData}
              activeCity={activeCity}
              offers={offers}
              leaflet={leaflet}
              className={`cities`}
            />
          </div>
        </div>
      </div>

    </main>
    </>
  );

};

MainPage.propTypes = {
  offers: PropTypes.arrayOf(Offer).isRequired,
  leaflet: PropTypes.object.isRequired,
  activeCity: PropTypes.string.isRequired,
  onCityClick: PropTypes.func.isRequired,
  userProfile: PropTypes.shape({
    id: PropTypes.number.isRequired,
    email: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    avatarUrl: PropTypes.string.isRequired,
    isPro: PropTypes.bool.isRequired,
  }),
  currentSortType: PropTypes.string.isRequired,
  onChangeSortType: PropTypes.func.isRequired
};

export default MainPage;
