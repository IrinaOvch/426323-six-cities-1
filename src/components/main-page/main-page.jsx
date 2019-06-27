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
    <div style={{display: `none`}}>
      <svg xmlns="http://www.w3.org/2000/svg"><symbol id="icon-arrow-select" viewBox="0 0 7 4"><path fillRule="evenodd" clipRule="evenodd" d="M0 0l3.5 2.813L7 0v1.084L3.5 4 0 1.084V0z"></path></symbol><symbol id="icon-bookmark" viewBox="0 0 17 18"><path d="M3.993 2.185l.017-.092V2c0-.554.449-1 .99-1h10c.522 0 .957.41.997.923l-2.736 14.59-4.814-2.407-.39-.195-.408.153L1.31 16.44 3.993 2.185z"></path></symbol><symbol id="icon-star" viewBox="0 0 13 12"><path fillRule="evenodd" clipRule="evenodd" d="M6.5 9.644L10.517 12 9.451 7.56 13 4.573l-4.674-.386L6.5 0 4.673 4.187 0 4.573 3.549 7.56 2.483 12 6.5 9.644z"></path></symbol></svg>
    </div>

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
